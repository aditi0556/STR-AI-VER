import Timeline from "../Timeline.jsx";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight.jsx";
import { FlipText } from "@/components/magicui/flip-text";
import Navbar from "../Navbar.jsx";
import Footer from "../Home Page/Footer.jsx";
export default function Map() {
  return (
    <>
      <div
        
        className="relative flex flex-col min-h-screen  w-full   bg-black/[0.96] antialiased z=40 "
      >
        <Navbar/>
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
        <section className="z-30">
          <FlipText
            duration={2.0}
            className="mt-35 tracking-tighter md:items-center md:justify-centerbg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl"
          >
            RoadMap For DSA
          </FlipText>
          <div className="mt-30 mb-35 z-50 w-full">
            <Timeline />
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}
