import api from "@/api";
import { useEffect,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
export default function Answered(){
    const navigate=useNavigate();
    const { getToken } =useAuth();
    const [ans,setAns]=useState([]);
    const [sign,setSign]=useState(false);
    useEffect(()=>{
        get_answers()
    },[])
    const get_answers=async ()=>{
        const token=await getToken();
        try{
            const res=await api.get("/answers/user",{
            headers:{ Authorization:`Bearer ${token}`}
        });
        setAns(res.data);
        if(res.data.length==0)
          setSign(false);
        else{
          setSign(true);
        }}
        catch(err){
            console.log(err);
            setSign(false);
        }
    }
    return (
      <>
        <div className="bg-gray-950 min-w-screen min-h-screen">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-white font-bold text-4xl my-5">You Answered</h1>
            <div className="flex flex-col items-start justify-center">
              {ans.map((ans, idx) => (
                <div key={idx} className="flex flex-col my-5">
                  <h1 className="text-2xl mx-2.5 font-bold text-white">
                    Description
                  </h1>
                  <p className="text-xl text-white mx-2.5">{ans.desc}</p>
                  <p className="text-0.5xl mx-2.5 text-white self-end">
                    {ans.q_id}
                  </p>
                  <div className="flex flex-row ">
                    <button
                      className="border-2 border-black hover:scale-110 rounded-2xl md:w-30 w-20 h-10 bg-blue-800 text-white  "
                      onClick={() => navigate(`/edit/${ans.answer_id}`)}
                    >
                      Edit
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="border-2 border-black hover:scale-110 rounded-2xl md:w-30 w-20 h-10 bg-blue-800 text-white "
                      
                    >
                      Delete
                    </button>
                  </div>
                  <hr className="h-2 bg-white  min-w-screen mt-2.5" />
                </div>
              ))}
            </div>
          </div>
          {!sign && (
            <h1 className="text-white text-2xl mx-5 font-bold">
              You have no answers posted.
            </h1>
          )}
        </div>
      </>
    );
}