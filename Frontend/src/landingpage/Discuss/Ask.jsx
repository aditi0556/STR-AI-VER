import { useState, useEffect } from "react";
import api from "../../api.js";
import Navbar from "../Navbar.jsx"
import { AuroraText } from "@/components/magicui/aurora-text";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "../Sidebar.jsx";
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
      <div className="flex flex-col  relative min-h-screen max-w-screen overflow-hidden bg-gray-900 ">
        <Navbar />
        <div className="flex flex-row max-w-screen  ">
          <Sidebar />
          <div className="flex-1 flex flex-col items-center  justify-center">
            <AuroraText
              speed={2}
              className="text-3xl  font-bold mt-15 tracking-tighter md:text-5xl lg:text-7xl"
            >
              Questions
            </AuroraText>
            <div className="flex flex-row justify-center items-center">
              <form action="/search" method="get">
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="search..."
                  name="query"
                  className=" md:w-2xl sm:w-0.5xl max-w-xl bg-gray-300 text-black mt-10 h-10 border-2 border-black rounded-2xl p-4"
                />
                &nbsp;&nbsp;
                <button className="md:w-30 w-20 border-2 font-semibold hover:scale-110 border-black hover:bg-blue-500 rounded-2xl bg-blue-400 text-black  p-0.5 h-10">
                  Search
                </button>
              </form>
            </div>

            <br />
            <button
              className="border-2 font-semibold border-black hover:scale-105 hover:bg-blue-500 rounded-2xl bg-blue-400 text-black w-35 p-0.5 h-10"
              onClick={() => navigate("/addquestion")}
            >
              Ask a Question
            </button>
            <div className="flex flex-col justify-center items-center mt-20  max-w-screen px-1.5">
              {question.map((q, idx) => (
                <div
                  key={idx}
                  className="flex flex-col m-3 xl:min-w-5xl md:min-w-xl  w-0.5xl border-5 rounded-3xl  p-2.5 "
                >
                  <a
                    href={`/questions/getall/${q.q_id}`}
                    className="text-blue-600 text-xl"
                  >
                    {q.title}
                  </a>
                  <h3 className="self-end text-white">{q.user_name}</h3>
                  <h3 className="self-end text-white">
                    asked on {q.created_at}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
