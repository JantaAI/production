'use client';

import { useState } from 'react';
// Using img tags directly to match design
import { ArrowRight } from 'lucide-react';
// Activation is handled through API route

interface OnboardingEProps {
  activationCode: string;
  onComplete: () => void;
}

export function OnboardingE({ activationCode, onComplete }: OnboardingEProps) {
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!password || !phone) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activation_code: activationCode,
          phone: phone,
          password: password,
          gender: gender || undefined,
          age: age ? parseInt(age) : undefined,
          city: city || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Activation failed');
      }

      const result = await response.json();
      
      // If session is returned, set it in Supabase client
      if (result.session && typeof window !== 'undefined') {
        const { supabase } = await import('@/lib/supabase');
        await supabase.auth.setSession(result.session);
      }
      
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Activation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && password && phone && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#f9f8f6]">
      {/* Logo */}
      <div className="absolute left-[35px] top-[4px] z-10">
        <img
          alt="JANTA"
          src="/assets/1764ad722a3a27350e171a5285220c9a91f02b7d.png"
          className="h-[70px] w-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Welcome text */}
        <h1 className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[32px] mb-12 text-center">
          Welcome!
        </h1>

        {/* 3 Graphics with labels */}
        <div className="flex gap-12 mb-12">
          <div className="flex flex-col items-center">
            <div className="size-[120px] mb-4">
              <img
                alt=""
                src="/assets/dd840bf9e199bcaea7f2aac3d9fa3577ef4fab7d.png"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[14px] text-center max-w-[140px]">
              Chat with AI Doctor
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="size-[120px] mb-4">
              <Image
                alt=""
                src="/assets/92b99631b24eeef4603dfbb5b1f6206a04a63b44.png"
                width={120}
                height={120}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[14px] text-center max-w-[140px]">
              Consult Real Doctors
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="size-[120px] mb-4">
              <img
                alt=""
                src="/assets/2b69ec7ca389ed9a098afe24ed912776a66a79a3.png"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[14px] text-center max-w-[140px]">
              Order Lab Tests
            </p>
          </div>
        </div>

        {error && (
          <p className="text-red-600 mb-4 text-sm">{error}</p>
        )}

        {/* Phone number input */}
        <div className="relative mb-4">
          <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[50px] rounded-[12px] w-[260px]" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (415) 555-0123"
            className="absolute inset-0 font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[22px] text-white bg-transparent border-none outline-none px-[16px] placeholder:text-[rgba(255,255,255,0.49)] text-center"
          />
        </div>

        {/* Optional fields */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender (optional)"
            className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[40px] rounded-[12px] w-[120px] text-white text-center text-sm placeholder:text-[rgba(255,255,255,0.49)]"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age (optional)"
            className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[40px] rounded-[12px] w-[120px] text-white text-center text-sm placeholder:text-[rgba(255,255,255,0.49)]"
          />
        </div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City (optional)"
          className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[40px] rounded-[12px] w-[260px] mb-4 text-white text-center text-sm placeholder:text-[rgba(255,255,255,0.49)]"
        />

        {/* Set password text */}
        <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[18px] mb-6 text-center">
          Set a password to start:
        </p>

        {/* Password input */}
        <div className="relative">
          <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[50px] rounded-[12px] w-[260px]" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="password"
            className="absolute inset-0 font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[22px] text-white bg-transparent border-none outline-none px-[16px] pr-[50px] placeholder:text-[rgba(255,255,255,0.49)] text-center"
            autoFocus
            disabled={loading}
          />
          {password && phone && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="absolute right-[12px] top-1/2 -translate-y-1/2 bg-white rounded-[8px] p-[6px] flex items-center justify-center disabled:opacity-50"
            >
              <ArrowRight className="w-[20px] h-[20px] text-[#482b22]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
