import imgConsultation from "figma:asset/ad4fbe475a1ce1de718fcc569d2c1deb2e7b00f5.png";
import imgDoctor from "figma:asset/6591f4e71bbd125eb4baebc90fb44e74dfe40ef4.png";
import imgReport from "figma:asset/dd6c9eef641836f92b06dc359d61bb997279ca99.png";

export default function Desktop() {
  return (
    <div className="relative size-full" data-name="Desktop">
      <div className="absolute bg-[#482b22] h-[96px] left-[375px] rounded-[7px] top-[309px] w-[125px]" />
      <p className="absolute font-['ABC_Diatype',sans-serif] font-medium leading-[normal] left-[383px] not-italic text-[#f9f9f9] text-[12px] text-nowrap top-[318px] whitespace-pre">Connect Wallet</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[387px] not-italic text-[#482b22] text-[14px] text-nowrap top-[410px] whitespace-pre">AI Doctor Chat</p>
      <div className="absolute bg-[#482b22] h-[96px] left-[534px] rounded-[7px] top-[309px] w-[125px]" />
      <p className="absolute font-['ABC_Diatype',sans-serif] font-medium leading-[normal] left-[543px] not-italic text-[#f9f9f9] text-[12px] text-nowrap top-[318px] whitespace-pre">Connect Wallet</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[538px] not-italic text-[#482b22] text-[14px] text-nowrap top-[410px] whitespace-pre">Call Real Doctors</p>
      <div className="absolute bg-[#482b22] h-[96px] left-[693px] rounded-[7px] top-[309px] w-[125px]" />
      <p className="absolute font-['ABC_Diatype',sans-serif] font-medium leading-[normal] left-[701px] not-italic text-[#f9f9f9] text-[12px] text-nowrap top-[318px] whitespace-pre">Connect Wallet</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[701px] not-italic text-[#482b22] text-[14px] text-nowrap top-[410px] whitespace-pre">Order Lab Tests</p>
      <div className="absolute left-[413px] size-[48px] top-[333px]" data-name="consultation">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgConsultation} />
      </div>
      <div className="absolute left-[572px] size-[48px] top-[333px]" data-name="doctor">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDoctor} />
      </div>
      <div className="absolute left-[731px] size-[48px] top-[333px]" data-name="report">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgReport} />
      </div>
    </div>
  );
}