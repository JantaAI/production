'use client';

import { useState } from 'react';
import { requestSupport } from '../api/support';

export function useSupport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const request = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await requestSupport();
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to request support');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    request,
  };
}
