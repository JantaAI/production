import imgConsultation from "figma:asset/ad4fbe475a1ce1de718fcc569d2c1deb2e7b00f5.png";
import imgDoctor from "figma:asset/6591f4e71bbd125eb4baebc90fb44e74dfe40ef4.png";
import imgReport from "figma:asset/dd6c9eef641836f92b06dc359d61bb997279ca99.png";

export default function Desktop() {
  return (
    <div className="relative size-full" data-name="Desktop">
      <div className="absolute bg-[#442b24] h-[145px] left-[287px] rounded-[7px] top-[272px] w-[175px]" />
      <div className="absolute border border-solid border-white h-[96px] left-[311px] rounded-[7px] top-[296px] w-[125px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] leading-[normal] left-[323px] not-italic text-[#442b24] text-[14px] top-[425px] w-[101px]">AI Doctor Chat</p>
      <div className="absolute bg-[#442b24] h-[145px] left-[510px] rounded-[7px] top-[272px] w-[174px]" />
      <div className="absolute border border-solid border-white h-[96px] left-[534px] rounded-[7px] top-[296px] w-[125px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] leading-[normal] left-[537px] not-italic text-[#442b24] text-[14px] top-[424px] w-[120px]">Call Real Doctors</p>
      <div className="absolute bg-[#442b24] h-[145px] left-[732px] rounded-[7px] top-[272px] w-[175px]" />
      <div className="absolute border border-solid border-white h-[96px] left-[756px] rounded-[7px] top-[296px] w-[125px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[18px] leading-[normal] left-[764px] not-italic text-[#442b24] text-[14px] top-[423px] w-[109px]">Order Lab Tests</p>
      <div className="absolute h-[69px] left-[339px] top-[310px] w-[70px]" data-name="consultation">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgConsultation} />
      </div>
      <div className="absolute h-[69px] left-[561px] top-[310px] w-[70px]" data-name="doctor">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDoctor} />
      </div>
      <div className="absolute h-[69px] left-[784px] top-[310px] w-[70px]" data-name="report">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgReport} />
      </div>
    </div>
  );
}