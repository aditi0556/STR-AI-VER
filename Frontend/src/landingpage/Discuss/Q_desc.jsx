import api from "../../api.js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from "../Navbar.jsx";
export default function Q_desc(){
  const navigate=useNavigate();
  const { getToken }=useAuth();
    const { q_id } = useParams();
    const [ans ,setAns]=useState("");
    const [question,setQuestion]=useState([]);
    const [sign,setSign]=useState(true);
    const [id,setId ]=useState("")
    const [answer,setAnswer]=useState([]);
    async function desc(){
        const res = await api.get(`/questions/getall/${q_id}`);
        setQuestion(res.data);
    }
    async function displayans(){
      const response=await api.get(`/answers/${q_id}`);
      console.log(response);
      setAnswer([...response.data]);
    }
    useEffect(()=>{
        desc();
        displayans();
    },[]);
    function handleChange(event){
      setAns(event.target.value);
    }
    const addAns=async ()=>{
      const token=await getToken();
      console.log(token);
       try {
         const result = await api.post("/answers/create",{desc:ans,q_id:question.q_id,user_name:question.user_name}, {
           headers: { Authorization: `Bearer ${token}` },
         });
         navigate("/discuss")
         console.log("yay");
       } catch (err) {
         setSign(false);
         console.log("User not signed in",err);
       }
    }
    const nav=()=>(navigate("/discuss"))
    function handleSubmit(e){
      addAns();
      e.preventDefault();
    }
    async function handleDelete(id){
      const t=await getToken();
      try{
        const response=await api.delete(`answers/delete/${id}`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      navigate("/discuss");
      }
      catch(err){
        console.log(err);
      }
    }
    return (
      <>
        <div className="flex flex-col px-5 min-h-screen w-full bg-gray-950 ">
          <Navbar />
          <h1 className="text-5xl mt-25  font-semibold text-white ">
            {question.title}
          </h1>
          <hr className="h-0.5 bg-white border-none my-6 " />
          <h1 className="text-2xl ml-2 font-bold text-white">
            Description
          </h1>
          <h2 className="text-2xl ml-2 font-normal text-white">
            {question.q_desc}
          </h2>
          <br />
          <button className=" bg-white text-black" onClick={()=>(navigate("/discuss"))}>discuss</button>
          <p className="inline text-white self-end ">
            Asked by:{question.user_name}
          </p>
          <p className="text-white self-end ">
            Created at:{question.created_at}
          </p>
          <h1 className="text-2xl font-bold text-white ml-2">Answers</h1>
          <br />
          <br />
          {answer.map((a, idx) => (
            <div key={idx} className="flex flex-col ml-2">
              <p className="text-xl text-white">{a.desc}</p>
              <p className="self-end text-xl font-semibold text-white">
                Answered by:{a.answer_username}
              </p>
              <button
                className="w-20 bg-blue-900 text-white h-10 hover:scale-110 rounded-2xl border-2 border-black"
                onClick={() => {
                  handleDelete(a.answer_id);
                }}
              >
                Delete
              </button>
              <hr className="h-1.5 bg-white border-none my-6" />
            </div>
          ))}

          <h1 className="text-4xl font-bold ml-2 text-white ">Your Answer</h1>
          <br />
          <form onSubmit={handleSubmit} className="w-full  ">
            <textarea
              name="desc"
              required
              rows="10"
              className="ml-2 p-2.5 w-full max-w-5xl bg-gray-900 text-white text-xl  resize-none border-3 border-black rounded-2xl "
              onChange={handleChange}
              placeholder="Answer this question...."
            ></textarea>
            <br />
            <button className="ml-2  w-25 h-10 my-2 bg-black text-white text-lg border-2 border-white rounded-2xl">
              Post
            </button>
          </form>
          {sign==false  && <RedirectToSignIn />}
        </div>
      </>
    );
}