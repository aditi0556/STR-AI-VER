import api from "../../api.js";
import { useParams } from "react-router";
import { useEffect,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
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
      console.log(answer);
       try {
         const result = await api.post("/answers/create",{desc:ans,q_id:question.q_id,user_name:question.user_name}, {
           headers: { Authorization: `Bearer ${token}` },
         });
         console.log(result);
         navigate("/discuss");
       } catch (err) {
         setSign(false);
         console.log("User not signed in",err);
       }
    }
    function handleSubmit(e){
      e.preventDefault();
      addAns();
    }
    async function handleDelete(id){
      const t=await getToken();
      console.log(id);
      console.log(t);
      try{
        const response=await api.delete(`answers/delete/${id}`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      }
      catch(err){
        console.log(err);
      }
    }
    return (
      <>
        <div className="flex flex-col p-5  my-2 w-full ">
          <Navbar />
          <h1 className="text-5xl my-15 font-semibold ">{question.title}</h1>
          <p className="inline">Asked by:{question.user_name}</p>
          <p>Created at:{question.created_at}</p>
          <hr className="h-0.5 bg-black border-none my-6" />
          <h1 className="text-2xl font-bold ">Description</h1>
          <h2 className="text-2xl font-normal">{question.q_desc}</h2>
          <br />
          <h1 className="text-2xl font-bold">Answers</h1>
          <br />
          <br />
          {answer.map((a,idx) => (
            <div key={idx} className="flex flex-col">
              <p className="text-xl ">{a.desc}</p>
              <p className="self-end text-xl font-semibold">Answered by:{a.answer_username}</p>
              <button
                className="w-20 bg-blue-900 text-white h-10"
                onClick={() => {
                  handleDelete(a.answer_id);
                }}
              >
                Delete
              </button>
              <hr className="h-1.5 bg-black border-none my-6" />
            </div>
          ))}

          <br />
          <br />
          <h1 className="text-2xl font-bold ml-2">Your Answer</h1>
          <form onSubmit={handleSubmit} className="w-full ">
            <textarea
              name="desc"
              required
              rows="10"
              className="w-full max-w-5xl bg-gray-900 text-white text-xl p-1.5 resize-none border-3 border-black rounded-2xl "
              onChange={handleChange}
            ></textarea>
            <br />
            <button className="w-25 h-10 bg-black text-white text-lg border-2 border-white rounded-2xl">
              Post
            </button>
          </form>
          {!sign && <RedirectToSignIn />}
        </div>
      </>
    );
}