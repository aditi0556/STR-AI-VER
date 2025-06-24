"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import  Navbar  from "../Navbar.jsx";
import { Spotlight } from "@/components/ui/Spotlight.jsx";
import { cn } from "@/lib/utils";
import Footer from "../Home Page/Footer.jsx"
import { Navigate, useNavigate } from 'react-router-dom';

export default function Doubts() {
    const navigate=useNavigate();
  const words = [
    {
      text: "Resolve\u00A0",
      className:"text-white"
    },
    {
      text: "My\u00A0 ",
      className:"text-white"
    },
    {
      text: "Code\u00A0",
      className:"text-white"
    },
    {
      text:"Problems\u00A0",
      className:"text-white"
    },
    {
      text: "STR-AI-VER.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <>
      <Navbar className=" fixed top-0 z-50" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black/[0.96] antialiased z=40 ">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
          )}
        />
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="lightblue"
        />
        <TypewriterEffectSmooth words={words} className=" z-40" />
        {/* <div className="z-50 mt-54">
                <Edit/>
            </div> */}
        <br />
        <br />
        <br />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4  z-50">
          <button
            className="w-35 h-10 rounded-xl hover:w-40 hover:ring  hover:text-lg bg-white text-black border border-black text-md hover:bg-blue-500 hover:text-white hover:font-bold transition-all duration-300 z-40"
            onClick={() => navigate("/Doubts/hints")}
          >
            Hints
          </button>
          <button
            className="w-35 h-10 rounded-xl hover:ring  hover:text-lg hover:w-40 bg-white text-black border border-black text-md hover:bg-blue-600 hover:text-white hover:font-bold transition-all duration-300 z-40"
            onClick={() => navigate("/Doubts/debug")}
          >
            Debug
          </button>
          <button
            className="w-35 h-10 rounded-xl hover:ring  hover:w-40 bg-white text-black border border-black text-md hover:bg-blue-500 hover:text-white hover:text-lg hover:font-bold transition-all duration-300 z-40"
            onClick={() => navigate("/Doubts/optimise")}
          >
            Optimise
          </button>
          <button
            className="w-35 h-10 rounded-xl hover:ring  hover:w-40 bg-white text-black border border-black text-md hover:bg-blue-500 hover:text-white hover:text-lg hover:font-bold transition-all duration-300 z-40"
            onClick={() => navigate("/Doubts/solve")}
          >
            Solve
          </button>
        </div>
      </div>
      <Footer className="fixed z=50 bottom-0 overflow-hidden" />
    </>
  );
}
