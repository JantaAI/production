'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export interface SupportStatus {
  id: string;
  current_status: string;
  status_message?: string;
  last_activity_at: string;
}

export function useSupportStatus(userId?: string) {
  const [status, setStatus] = useState<SupportStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Fetch initial status
    const fetchStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('support_requests')
          .select('id, current_status, status_message, last_activity_at')
          .eq('user_id', userId)
          .eq('status', 'in_progress')
          .order('requested_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          throw error;
        }

        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`support-status:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'support_requests',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setStatus({
            id: payload.new.id,
            current_status: payload.new.current_status,
            status_message: payload.new.status_message,
            last_activity_at: payload.new.last_activity_at,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return {
    status,
    loading,
    error,
  };
}
