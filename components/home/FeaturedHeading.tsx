import Image from "next/image";

const NARRATIVE =
  "I don\u2019t build to fill a portfolio. Some of these started as problems I wanted to solve. Others started as something I wanted to give someone. All of them taught me something I couldn\u2019t learn any other way.";

export default function FeaturedHeading() {
  return (
    <>
      <div
        className="grid w-full items-center"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <span
          className="select-none pr-2 text-right font-display uppercase leading-none text-cream md:pr-6"
          style={{ fontSize: "clamp(28px, 9.5vw, 148px)" }}
        >
          FEATURED
        </span>

        <Image
          src="/images/karya.png"
          alt="Karya — Indonesian for work"
          width={200}
          height={600}
          className="h-[18vw] w-auto md:h-[16vw] lg:h-[18vw]"
        />

        <span
          className="select-none pl-2 text-left font-display uppercase leading-none text-cream md:pl-6"
          style={{ fontSize: "clamp(28px, 9.5vw, 148px)" }}
        >
          PROJECTS
        </span>
      </div>

      <p className="mt-4 max-w-md px-6 text-center font-mono text-[9px] leading-relaxed text-cream/45 md:mt-8 md:px-0 md:text-[10px]">
        {NARRATIVE}
      </p>
    </>
  );
}
