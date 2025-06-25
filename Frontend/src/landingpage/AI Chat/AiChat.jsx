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
  const [response, setResponse] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  function handleClick() {
    console.log(click);
    setClick((click) => {
      return !click;
    });
  }

  function handleChange(e) {
    setChange(e.target.value);
  }

  async function main() {
    setLoading(true);
    try {
      if (change != "") {
        const res = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${change} (Answer in under 50 words.Also use ' or " inplace of * or **)`,
                },
              ],
            },
          ],
          history: history,
          config: {
            temperature: 0.1,
            systemInstruction: {
              role: "system",
              parts: [
                {
                  text: " Your name is Neko.Also answer any question in less than 50 words.Also you are incharge of this website which is called STR-AI-VER.It consists of a Roadmap for DSA where user can start their dsa journey.Any user should Start with arrays and strings. Once you're comfortable, move on to linked lists and recursion. Here's the full roadmap: [/doubts].This website also provides you with a doubt solver where a user can Debug, get Hints,get Solutions and can get Optimised code for their code and problems.Also dont answer any questions apart from STR-AI-VER website and DSA related queries.In such cases give appropriate error. ",
                },
              ],
            },
          },
        });
        const reply = await res.text;
        setResponse([...response, reply]);
        setHistory([
          ...history,
          { role: "user", parts: [{ text: change }] },
          { role: "model", parts: [{ text: reply }] },
        ]);
      } else {
        console.log("please input first");
      }
    } catch (err) {
      console.log(err);
      setResponse([...response, "something went wrong"]);
      setHistory([
        ...history,
        { role: "user", parts: [{ text: change }] },
        { role: "model", parts: [{ text: "something went wrong" }] },
      ]);
    } finally {
      setLoading(false);
    }
  }
  function handleSubmit() {
    setSubmit(!submit);
    main();
    setChange("");
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
        <div className="fixed bottom-24 right-6 h-[500px] max-w-[300px] sm:max-w-[400px]  bg-white rounded-3xl flex flex-col z-50 justify-end overflow-y-auto">
          <div class="relative overflow-hidden overflow-y-auto ">
            {history.map((msg, index) => (
              <div
                key={index}
                className={`p-3 my-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-gray-700 text-white text-left mx-2 w-fit"
                    : "bg-gray-800 text-white text-right ml-auto mx-2 w-fit max-w-3/4"
                }`}
              >
                <strong>
                  {msg.role === "user" ? "You" : "Gemini"}:&nbsp;&nbsp;
                </strong>
                {msg.parts[0].text}
              </div>
            ))}
          </div>

          <div className="flex flex-row ">
            <Input value={change} onChange={handleChange} />
            <button
              className="bg-black  text-white border-2 px-1  mx-2 rounded-2xl w-md h-12 mt-1.5 "
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
