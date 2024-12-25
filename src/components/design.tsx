import React from 'react';
import Image from 'next/image';

const Design = () => {
  return (
    <>
      {/* Top-left SVG (Desktop only) */}
      <div className="absolute -left-6 -top-[84px] hidden w-[220px] lg:block">
        <Image src="/assets/tl.svg" alt="Yellow" width={220} height={220} />
      </div>

      {/* Top-right SVG (Desktop only) */}
      <div className="absolute -top-8 right-0.5 hidden w-[80px] lg:block">
        <Image src="/assets/dots_t.svg" alt="Dots" width={80} height={80} />
      </div>

      {/* Top-left leaf */}
      <div className="fixed -left-[36px] top-[110px] -z-10 hidden w-[120px] lg:block">
        <Image src="/assets/leaf_tl.svg" alt="Dots" width={200} height={200} />
      </div>

      {/* Top-right leaf */}
      <div className="fixed -right-[32px] top-[120px] -z-10 hidden w-[120px] lg:block">
        <Image src="/assets/leaf_tr.svg" alt="Dots" width={200} height={200} />
      </div>

      {/* Bottom-left SVG leaf */}
      <div className="fixed -bottom-[72px] left-[40px] -z-10 hidden w-[200px] lg:block">
        <Image src="/assets/leaf_bl.svg" alt="Dots" width={600} height={600} />
      </div>

      {/* Bottom-center SVG dots */}
      <div className="fixed bottom-[32px] left-[40%] -z-10 hidden w-[72px] lg:block">
        <Image src="/assets/dots_b.svg" alt="Dots" width={600} height={600} />
      </div>

      {/* Bottom-right SVG flower */}
      <div className="fixed -bottom-[230px] -right-[170px] -z-10 hidden w-[600px] lg:block">
        <Image src="/assets/flower.svg" alt="Dots" width={600} height={600} />
      </div>

      {/* Bottom-right SVG blob */}
      <div className="fixed -bottom-[40px] -right-[28px] -z-10 hidden w-[270px] lg:block">
        <Image src="/assets/br.svg" alt="Dots" width={600} height={600} />
      </div>

      {/* Bottom-right SVG leaf */}
      <div className="fixed -bottom-[40px] -right-[56px] -z-10 hidden w-[200px] lg:block">
        <Image src="/assets/leaf_br.svg" alt="Dots" width={600} height={600} />
      </div>
    </>
  );
};
export default Design;
