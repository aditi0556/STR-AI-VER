import { useState, useEffect } from "react";
import api from "../../api.js";
import Navbar from "../Navbar.jsx"
import { AuroraText } from "@/components/magicui/aurora-text";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
export default function Ask() {
  const [question, setQuestion] = useState([]);
  const [search, setSearch]=useState("");
  const navigate = useNavigate();
  const getAll = async () => {
    const res = await api.get("/questions/getall/");
    console.log(res);
    setQuestion([...res.data]);
  };

  useEffect(() => {
    getAll();
  }, []);

  function handleChange(e){
    console.log(e.target.value);
    setSearch(e.target.value)
  }


  return (
    <>
      <div className="relative min-h-screen  w-screen bg-gray-900 ">
        <Navbar />
        <div className="flex flex-col items-center  justify-center">
          <AuroraText
            speed={2}
            className="text-3xl  font-bold mt-15 tracking-tighter md:text-5xl lg:text-7xl"
          >
            Questions
          </AuroraText>
          <form action="/search" method="get">
            <input
              onChange={handleChange}
              type="text"
              placeholder="search..."
              name="query"
              className="bg-gray-300 text-black mt-10 w-2xl h-10 border-2 border-black rounded-2xl p-4"
            />
            &nbsp;&nbsp;
            <button className="border-2 border-black hover:bg-blue-500 rounded-2xl bg-blue-400 text-black w-30 p-0.5 h-10">
              Ask Question
            </button>
          </form>
          <br />
          <button
            className="border-2 border-black hover:bg-blue-500 rounded-2xl bg-blue-400 text-black w-30 p-0.5 h-10"
            onClick={() => navigate("/addquestion")}
          >
            Add
          </button>
          <div className="flex flex-col  justify-center items-center mt-20 w-screen">
            {question.map((q, idx) => (
              <div
                key={idx}
                className="flex flex-col w-7xl border-5 rounded-3xl m-3 p-2.5 "
              >
                <a
                  href={`/questions/getall/${q.q_id}`}
                  className="text-blue-600 text-xl"
                >
                  {q.title}
                </a>
                <h3 className="self-end text-white">{q.user_name}</h3>
                <h3 className="self-end text-white">asked on {q.created_at}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
