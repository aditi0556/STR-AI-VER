import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input.jsx";
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Loader from "../CodeEditor/Loader.jsx";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });


export default function AiChat() {
  const [click, setClick] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [change, setChange] = useState("");
  const [response, setResponse] = useState("");
  const [loading,setLoading]=useState(false);
  function handleClick() {
    console.log(click);
    setClick((click) => {
      return !click;
    });
  }
  function handleChange(e){
    setChange(e.target.val);
    setChange("");
  }
  async function main() {
    setLoading(true);
    try {
      if (change != "") {
        const res = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: change,
        });
        setResponse(res.text);
      }
      
    } catch (err) {
      console.log(err);
      setResponse(err);
    }
    finally{
      setLoading(false);
    }
  }
  function handleSubmit() {
    setSubmit(!submit);
    main();
  }
  return (
    <>
      <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-50">
        <button onClick={handleClick}>
          {!click ? (
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="text-white text-5xl"
            />
          ) : (
            <FontAwesomeIcon icon={faXmark} className="text-white text-5xl" />
          )}
        </button>
      </div>
      {click && (
        <div className="fixed bottom-24 right-6 h-120 w-100 bg-white rounded-3xl flex flex-col z-50 justify-end">
          <div className="bg-green-800 max-h-screen ">
            {change != "" && (
              <textarea
                value={change}
                className="border-2 rounded-2xl w-[300px]"
              ></textarea>
            )}
          </div>
          <div>
            {response != "" && <textarea value={response} readOnly></textarea>}
          </div>
          <div className="flex flex-row ">
            <Input value={change} onChange={handleChange} />
            <button
              className="bg-black hover:bg-blue-800 text-white border-2 rounded-2xl w-md h-12 mt-1.5 "
              
              onClick={handleSubmit}
            >
              {loading ? <Loader /> : "Ask"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
//App.js
