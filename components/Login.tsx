'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
// Using img tags directly to match design

interface LoginProps {
  onBack: () => void;
  onLogin: () => void;
}

export default function Login({ onBack, onLogin }: LoginProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!phone || !password) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        phone: phone,
        password: password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data.session) {
        onLogin();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f8f6] relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* JANTA Logo - top left, foreground */}
      <div className="absolute left-[16px] top-[4px] z-10">
        <img
          alt="JANTA"
          src="/assets/Logo Janta.png"
          className="h-[70px] w-auto object-contain cursor-pointer"
          onClick={onBack}
        />
      </div>

      {/* Centered login form */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[48px] text-nowrap text-[#000000] whitespace-pre mb-4">
          Welcome back!
        </p>
        <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[20px] text-nowrap text-[#000000] whitespace-pre mb-16">
          Log in using your phone number and Password
        </p>

        {error && (
          <p className="text-red-600 mb-4 text-sm">{error}</p>
        )}

        <div className="flex flex-col gap-[18px]">
          <div className="relative">
            <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[60px] rounded-[12px] w-[260px]" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 415 867 3499"
              className="absolute inset-0 font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[22px] text-[rgba(255,255,255,0.49)] bg-transparent border-none outline-none px-[4.5px] placeholder:text-[rgba(255,255,255,0.49)] text-center"
            />
          </div>

          <div className="relative">
            <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[60px] rounded-[12px] w-[260px]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleLogin();
                }
              }}
              placeholder="password"
              className="absolute inset-0 font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[22px] text-[rgba(255,255,255,0.49)] bg-transparent border-none outline-none px-[4.5px] placeholder:text-[rgba(255,255,255,0.49)] text-center"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading || !phone || !password}
            className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[60px] rounded-[12px] w-[260px] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
