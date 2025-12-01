'use client';

import { useState, useEffect, useRef } from 'react';
// Using img tags directly to match design

interface OnboardingECodeProps {
  onComplete: (code: string) => void;
}

export function OnboardingECode({ onComplete }: OnboardingECodeProps) {
  const [uniqueCode, setUniqueCode] = useState(['', '', '', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (uniqueCode.every(char => char !== '')) {
      const code = uniqueCode.join('');
      setTimeout(() => {
        onComplete(code);
      }, 300);
    }
  }, [uniqueCode, onComplete]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[A-Za-z0-9]*$/.test(value)) {
      const newCode = [...uniqueCode];
      newCode[index] = value.toUpperCase();
      setUniqueCode(newCode);

      if (value && index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !uniqueCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
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
        <h1 className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[24px] text-nowrap whitespace-pre mb-8 text-center">
          Enter your employee code
        </h1>

        <div className="flex gap-3">
          {uniqueCode.map((char, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              value={char}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 bg-[#482b22] border-2 border-[#482b22] rounded-lg text-white text-center text-[18px] uppercase focus:outline-none focus:border-[#482b22] transition-colors"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
