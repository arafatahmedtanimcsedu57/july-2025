import Image from "next/image";
import { Button } from "@/shared/ui/button";

import HeroBg from "@/public/header-banner.png";
import { heroData } from "../data";

function HeroSection() {
  return (
    <section className="py-16 relative group">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={HeroBg}
          alt="Background"
          fill
          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
        />
      </div>
      <div className="container mx-auto px-10 relative z-10">
        <div className="flex flex-wrap justify-between gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4">
              {heroData.title.map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>
            <p className="text-shadow-2xs drop-shadow-lg text-xl md:text-2xl uppercase mb-8 max-w-2xl">
              {heroData.subtitle}
            </p>
            <p className="text-base mb-12 max-w-2xl">{heroData.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {heroData.actions.map((label, idx) => (
              <Button key={idx} variant="outline" className="text-slate-700">
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
