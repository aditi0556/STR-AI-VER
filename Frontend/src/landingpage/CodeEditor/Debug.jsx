import { GoogleGenAI } from "@google/genai";
import Language from "./Language.jsx";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import Loader from "./Loader.jsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Code } from "lucide-react";

export default function Debug() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  // const [selectedLanguage,setSelectedLanguage]=useState("");
  const [loading, setLoading] = useState(false);

  function handleInput(e) {
    setInput(e.target.value);
  }

  async function handleClick() {
    setResponse("");
    setLoading(true);
    try {
      const check = `This is my ${input}.Return in true or false whether this is a code which can be debugged`;
      const checkRes = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: check,
      });

      if (checkRes.text) {
        const prompt = `This is my code ${input}.Debug it ,tell me the errors and give me the correct code.`;
        const res = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });
        const ans = res.text;

        setResponse(ans);
      }
      // setResponse(ans);}
      else {
        setResponse(
          "This is not a valid code.Therefore it cannot be debugged.Please enter a valid code"
        );
      }
    } catch (err) {
      setResponse(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex flex-col bg-[#191A1E] min-h-screen  w-full overflow-x-hidden">
        <div className="mt-7 flex flex-row justify-center items-center  break-words">
          <AuroraText
            speed={2}
            className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl"
          >
            Debug Your Code
          </AuroraText>
        </div>
        <div className="flex flex-col md:flex-col justify-evenly h-[600px] mt-[100px] mx-[20px] mb-[40px]">
          <ResizablePanelGroup
            direction="horizontal"
            className=" max-w-screen  rounded-lg  md:min-w-[450px]   border-4 border-black"
          >
            <ResizablePanel defaultSize={50} minSize={20}>
              <div className="flex flex-col h-full  ">
                <textarea
                  className="resize-none w-full h-full p-4 text-xl bg-[#24262C] text-white"
                  placeholder="Enter the question.."
                  onChange={handleInput}
                  spellCheck="false"
                ></textarea>
              </div>
            </ResizablePanel>
            <ResizableHandle className="border-6 border-x-black " />

            <ResizablePanel defaultSize={50} minSize={20}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                  defaultSize={10}
                  className="bg-[#121E23] pt-4 text-white"
                >
                  <div className="flex flex-row justify-end items-between ">
                    {/* <Language
                      className="my-0.5 bg-[#121E23] pt-4 "
                      onLanguageChange={setSelectedLanguage}
                    /> */}
                    <Button
                      onClick={handleClick}
                      className="bg-blue-500 hover:size-lg hover:bg-blue-700 mx-1 text-white size-md"
                    >
                      {loading ? <Loader /> : "Debug"}
                    </Button>
                  </div>
                </ResizablePanel>
                <ResizablePanel defaultSize={90}>
                  <div className="flex flex-col h-full w-full  ">
                    <textarea
                      name="Hints....."
                      value={response}
                      placeholder="your solution......"
                      spellCheck="false"
                      className=" resize-none w-full h-full p-4  text-xl bg-[#24262C] text-white"
                      // className="resize-x bg-[rgb(51,51,51)] w-2xl  mr-8 mt-40 text-white border-2 border-blue-500"
                    >
                      <ReactMarkdown> {response} </ReactMarkdown>;
                    </textarea>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
}
