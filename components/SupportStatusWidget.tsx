'use client';

import { useSupportStatus } from '@/lib/hooks/useSupportStatus';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export function SupportStatusWidget() {
  const [userId, setUserId] = useState<string | undefined>();
  const { status, loading, error } = useSupportStatus(userId);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        // Get user_id from users table
        supabase
          .from('users')
          .select('id')
          .eq('auth_user_id', user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUserId(data.id);
            }
          });
      }
    });
  }, []);

  if (loading) {
    return <div>Loading status...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!status) {
    return null;
  }

  return (
    <div className="support-status-widget">
      <div className="status-bar">
        <div className="status-indicator" data-status={status.current_status} />
        <div className="status-content">
          <div className="status-title">{status.status_message || status.current_status}</div>
          <div className="status-time">Last updated: {new Date(status.last_activity_at).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
