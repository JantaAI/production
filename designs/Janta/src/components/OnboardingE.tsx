import { useState, useEffect, useRef } from 'react';
import imgJantaWhiteT1 from "figma:asset/1764ad722a3a27350e171a5285220c9a91f02b7d.png";
import imgMedicalChat from "figma:asset/dd840bf9e199bcaea7f2aac3d9fa3577ef4fab7d.png";
import imgDoctorIcon from "figma:asset/92b99631b24eeef4603dfbb5b1f6206a04a63b44.png";
import imgLabTest from "figma:asset/2b69ec7ca389ed9a098afe24ed912776a66a79a3.png";
import { ArrowRight } from 'lucide-react';

interface OnboardingEProps {
  onComplete: () => void;
}

export function OnboardingE({ onComplete }: OnboardingEProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (password) {
      onComplete();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && password) {
      handleSubmit();
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#f9f8f6]">
      
      {/* Logo */}
      <div className="absolute left-[35px] top-[4px] z-10">
        <img alt="JANTA" className="h-[70px] w-auto object-contain" src={imgJantaWhiteT1} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Welcome text */}
        <h1 className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[32px] mb-12 text-center">Welcome Spencer!</h1>
        
        {/* 3 Graphics with labels */}
        <div className="flex gap-12 mb-12">
          <div className="flex flex-col items-center">
            <div className="size-[120px] mb-4">
              <img alt="" className="w-full h-full object-contain" src={imgMedicalChat} />
            </div>
            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[14px] text-center max-w-[140px]">Chat with AI Doctor</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="size-[120px] mb-4">
              <img alt="" className="w-full h-full object-contain" src={imgDoctorIcon} />
            </div>
            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[14px] text-center max-w-[140px]">Consult Real Doctors</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="size-[120px] mb-4">
              <img alt="" className="w-full h-full object-contain" src={imgLabTest} />
            </div>
            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[14px] text-center max-w-[140px]">Order Lab Tests</p>
          </div>
        </div>
        
        {/* Set password text */}
        <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[18px] mb-6 text-center">Set a password to start:</p>
        
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
          />
          {password && (
            <button
              onClick={handleSubmit}
              className="absolute right-[12px] top-1/2 -translate-y-1/2 bg-white rounded-[8px] p-[6px] flex items-center justify-center"
            >
              <ArrowRight className="w-[20px] h-[20px] text-[#482b22]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}