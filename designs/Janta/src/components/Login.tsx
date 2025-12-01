import imgJantaWhiteT1 from "figma:asset/1764ad722a3a27350e171a5285220c9a91f02b7d.png";

interface LoginProps {
  onBack: () => void;
  onLogin: () => void;
}

export default function Login({ onBack, onLogin }: LoginProps) {
  return (
    <div className="bg-[#f9f8f6] relative min-h-screen flex items-center justify-center overflow-hidden" data-name="Desktop">

      {/* JANTA Logo - top left, foreground */}
      <div className="absolute left-[16px] top-[4px] z-10">
        <img alt="JANTA" className="h-[70px] w-auto object-contain cursor-pointer" src={imgJantaWhiteT1} onClick={onBack} />
      </div>

      {/* Centered login form */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[48px] text-nowrap text-[#000000] whitespace-pre mb-4">Welcome back!</p>
        <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[20px] text-nowrap text-[#000000] whitespace-pre mb-16">Log in using your phone number and Password</p>
        
        <div className="flex flex-col gap-[18px]">
          <div className="relative">
            <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[60px] rounded-[12px] w-[260px]" />
            <input 
              type="tel" 
              placeholder="+1 415 867 3499"
              className="absolute inset-0 font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[22px] text-[rgba(255,255,255,0.49)] bg-transparent border-none outline-none px-[4.5px] placeholder:text-[rgba(255,255,255,0.49)] text-center"
            />
          </div>
          
          <div className="relative">
            <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid h-[60px] rounded-[12px] w-[260px]" />
            <input 
              type="password" 
              placeholder="password"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onLogin();
                }
              }}
              className="absolute inset-0 font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[22px] text-[rgba(255,255,255,0.49)] bg-transparent border-none outline-none px-[4.5px] placeholder:text-[rgba(255,255,255,0.49)] text-center"
            />
          </div>


        </div>
      </div>
    </div>
  );
}