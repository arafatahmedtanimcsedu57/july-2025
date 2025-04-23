import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

import HeroBg from "@/public/header-banner.png";
import { heroData } from "../data";
import { Send } from "lucide-react";

function HeroSection() {
  return (
    <section className="py-16 relative group min-h-[50vh] flex items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={HeroBg}
          alt="Background"
          fill
          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
        />
      </div>
      <div className="container m-auto px-10 relative z-10">
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
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-shadow-2xs drop-shadow-lg text-xl md:text-2xl uppercase mb-8 max-w-2xl">
              {heroData.subtitle}
            </p>

            {heroData.actions.map((label, idx) => (
              <Link href="/content-collection" key={idx}>
                <Button
                  variant="outline"
                  className="text-slate-700  inline-flex gap-2 items-center w-fit"
                >
                  <Send /> {label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
