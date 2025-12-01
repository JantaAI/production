import svgPaths from "../imports/svg-pw71ztqpt5";
import { imgGroup } from "../imports/svg-i9okd";

function Group() {
  return (
    <div className="absolute inset-[58.91%_3.98%_5.31%_28.17%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-604.22px_-744.634px] mask-size-[2145px_1264px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1456 453">
        <g id="Group">
          <path d={svgPaths.pb79b800} fill="var(--fill-0, #3D0E07)" id="Vector" />
          <path d={svgPaths.p27ee8600} fill="var(--fill-0, #3D0E07)" id="Vector_2" />
          <path d={svgPaths.p95d2000} fill="var(--fill-0, #3D0E07)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

export function GradientBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Base cream background */}
      <div className="absolute bg-[#f9f8f6] inset-[35px_83px]" />
      
      {/* Decorative pattern overlay */}
      <ClipPathGroup />
      
      {/* Dark base layer that ensures corners are covered */}
      <div className="absolute bg-[#3d0e07] h-[1264px] left-0 top-0 w-[2145px]" />
      
      {/* Orange gradient ellipse 1 - middle */}
      <div className="absolute h-[397px] left-[150px] top-[469px] w-[1881px]">
        <div className="absolute inset-[-56.93%_-12.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2333 849">
            <g filter="url(#filter0_f_14_721)" id="Ellipse 10">
              <ellipse cx="1166.5" cy="424.5" fill="var(--fill-0, #E73E07)" rx="940.5" ry="198.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="849" id="filter0_f_14_721" width="2333" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_14_721" stdDeviation="113" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Yellow gradient ellipse 1 */}
      <div className="absolute flex h-[89px] items-center justify-center left-[270px] top-[668px] w-[1614px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[89px] relative w-[1614px]">
            <div className="absolute inset-[-157.3%_-8.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1894 369">
                <g filter="url(#filter0_f_14_725)" id="Ellipse 12">
                  <ellipse cx="947" cy="184.5" fill="var(--fill-0, #FEDC59)" rx="807" ry="44.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="369" id="filter0_f_14_725" width="1894" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_14_725" stdDeviation="70" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Orange gradient ellipse 2 - large covering top and center */}
      <div className="absolute h-[1022px] left-[150px] top-[134px] w-[1881px]">
        <div className="absolute inset-[-22.11%_-12.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2333 1474">
            <g filter="url(#filter0_f_14_723)" id="Ellipse 13">
              <ellipse cx="1166.5" cy="737" fill="var(--fill-0, #E73E07)" fillOpacity="0.81" rx="940.5" ry="511" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1474" id="filter0_f_14_723" width="2333" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_14_723" stdDeviation="113" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Yellow gradient ellipse 2 - duplicate for layering */}
      <div className="absolute flex h-[89px] items-center justify-center left-[270px] top-[668px] w-[1614px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-[89px] relative w-[1614px]">
            <div className="absolute inset-[-157.3%_-8.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1894 369">
                <g filter="url(#filter0_f_14_725)" id="Ellipse 12">
                  <ellipse cx="947" cy="184.5" fill="var(--fill-0, #FEDC59)" rx="807" ry="44.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="369" id="filter0_f_14_725" width="1894" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_14_725" stdDeviation="70" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}