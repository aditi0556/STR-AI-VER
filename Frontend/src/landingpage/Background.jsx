import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
// import CarouselDemo from "./Home Page/CarouselDemo";
import { VideoText } from "@/components/magicui/video-text";
import { FlipText } from "@/components/magicui/flip-text";
import Timeline from "./Timeline.jsx";
export default function Background() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen  w-full   bg-black/[0.96] antialiased z=40 ">
        {/* <Navbar className="absolute top-0 w-full z-20 overflow-hidden" /> */}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
          )}
        />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div
          id="home"
          className="flex flex-col  relative z-40 mx-auto w-full max-w-7xl p-4 mt-70 md:pt-0 "
        >
          <h1 className=" md:items-center md:justify-centerbg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-8xl">
            STR-AI-VER
          </h1>
          <br />
          <p className="md:items-center top-2 mx-auto mt-4 max-w-lg text-center text-lg font-normal text-neutral-300">
            Not started DSA yet? No worries—Str-AI-Ver&apos;s got your back!
            Your AI Powered path to DSA mastery.
          </p>
        </div>
        {/* <section id="rdMap" className="z-30">
                <FlipText
                  duration={2.5}
                  className="mt-60 tracking-tighter md:items-center md:justify-centerbg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl"
                >
                  RoadMap For DSA
                </FlipText>
                <div className="mt-30 mb-35 z-50 w-full">
                  <Timeline />
                </div>
              </section> */}
      </div>
    </>
  );
}

