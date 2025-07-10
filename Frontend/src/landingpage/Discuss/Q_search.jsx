import { useState,useEffect } from "react";
import api from "../../api.js";
import Navbar from "../Navbar.jsx"
import { AuroraText } from "@/components/magicui/aurora-text";
import { useSearchParams } from "react-router";

export default function Q_search() {
  const [searchParams]=useSearchParams();
  const [search, setSearch] = useState("");
  const [res,setRes]=useState([])
  const q=searchParams.get("query");
  function handleChange(e) {
    setSearch(e.target.value);
  }
  async function get_searchResults(){
    const result=await api.get(`/questions/search?q=${q}`)
    setRes([...result.data]);
  }
  useEffect(()=>{
    get_searchResults()
  },[]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Navbar />
        <AuroraText
          speed={2}
          className="text-3xl font-bold mt-15 tracking-tighter md:text-5xl lg:text-7xl"
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
          <button className="border-2 border-black hover:bg-blue-500 rounded-2xl bg-blue-400 text-black w-30 p-0.5 h-10"
          >
            Ask Question
          </button>
        </form>
        <div className="flex flex-col justify-center items-center mt-20 w-screen">
          { res.length==0 && 
          <div>
            <p>No results found</p>
          </div>}
          {res.length!=0 && res.map((q, idx) => (
            <div
              key={idx}
              className="flex flex-col w-7xl border-5 rounded-3xl m-3 p-2.5 "
            >
              <a href={`/questions/getall/${q.q_id}`} className="text-blue-600">
                {q.title}
              </a>
              <h3 className="self-end">{q.user_name}</h3>
              <h3 className="self-end">asked on {q.created_at}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
