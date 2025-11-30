'use client';

import { useState } from 'react';
import { sendChatMessage } from '../api/chat';

export function useChat() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setError(null);

    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content: message }]);

    try {
      const response = await sendChatMessage({ message });
      
      // Add AI response
      setMessages(prev => [...prev, { role: 'ai', content: response.response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      // Remove user message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
}
