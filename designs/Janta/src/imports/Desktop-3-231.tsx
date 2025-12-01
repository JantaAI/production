import svgPaths from "./svg-yl715khjs8";
import imgJantaWhiteT1 from "figma:asset/4f6d77b48bfb850ee130de36b9b051799b1ae522.png";
import { imgGroup } from "./svg-ydw9g";

function Group() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[783.162px_556.915px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 557">
        <g id="Group">
          <path d={svgPaths.p157ae7f0} fill="var(--fill-0, #4C4E4C)" id="Vector" />
          <path d={svgPaths.p24e0b100} fill="var(--fill-0, #4C4E4C)" id="Vector_2" />
          <path d={svgPaths.p2b806c40} fill="var(--fill-0, #4C4E4C)" id="Vector_3" />
          <path d={svgPaths.p1e0b5000} fill="var(--fill-0, #4C4E4C)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute bottom-[0.72%] left-0 mask-position-[0px,_0px_4px,_-1px] mask-size-[783.162px_556.915px,_783.162px_556.915px] right-0 top-[-0.72%]" data-name="Group" style={{ maskImage: `url('${imgGroup}'), url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 557">
        <g id="Group">
          <path d={svgPaths.p157ae7f0} fill="var(--fill-0, #4C4E4C)" id="Vector" />
          <path d={svgPaths.p2ae79400} fill="var(--fill-0, #4C4E4C)" id="Vector_2" />
          <path d={svgPaths.pcf7a200} fill="var(--fill-0, #4C4E4C)" id="Vector_3" />
          <path d={svgPaths.p3db35900} fill="var(--fill-0, #4C4E4C)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute bottom-[0.9%] contents left-0 right-0 top-[-0.9%]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
      <ClipPathGroup />
      <div className="absolute left-[16px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-16px_0px] mask-size-[783.162px_556.915px] size-[51px] top-0" data-name="JANTA WHITE T 1" style={{ maskImage: `url('${imgGroup}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgJantaWhiteT1} />
      </div>
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop">
      <ClipPathGroup1 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[280px] not-italic text-[10px] text-nowrap text-white top-[197px] whitespace-pre">Log in using your phone number and Password</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[304px] not-italic text-[24px] text-nowrap text-white top-[160px] whitespace-pre">Welcome back!</p>
      <div className="absolute bg-[#3e3e3e] border-[#282828] border-[0.3px] border-solid h-[30px] left-[332px] rounded-[8px] top-[229px] w-[120px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[42.56%_43.69%_55.11%_43.8%] leading-[normal] not-italic text-[11px] text-[rgba(255,255,255,0.49)]">+1 415 867 3499</p>
      <div className="absolute bg-[#3e3e3e] border-[#282828] border-[0.3px] border-solid h-[29px] left-[332px] rounded-[8px] top-[268px] w-[120px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[49.92%_45.86%_47.75%_45.97%] leading-[normal] not-italic text-[11px] text-[rgba(255,255,255,0.49)]">_ _ _ _ _ _ _ _</p>
    </div>
  );
}