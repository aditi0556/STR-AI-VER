import api from "../../api.js";
import { useParams } from "react-router";
import { useEffect,useState } from "react";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";


export default function Q_desc(){
    const { q_id } = useParams();
    const [question,setQuestion]=useState([]);
    console.log(q_id);
    async function desc(){
        console.log("aditi");
        const res = await api.get(`/questions/getall/${q_id}`);
        console.log(res.data);
        setQuestion(res.data);
    }
    useEffect(()=>{
        desc();
    },[]);
    function handleChange(event){
        console.log(event.target.value);
    }
    return (
      <>
        <div className="flex flex-col p-5 justify-center items-center ">
          <h1 className="text-5xl font-semibold ">{question.title}</h1>
          <p>Asked by:{question.user_name}</p>
          <p>Created at:{question.created_at}</p>
          <h2 className="text-2xl font-normal">{question.q_desc}</h2>

          <h1 className="text-3xl font-bold ">Your Answer</h1>
          <form>
            <textarea
              name="desc"
              rows="15"
              cols="150"
              required
              className="bg-gray-900 text-white text-xl p-1.5 resize-none border-3 border-black rounded-2xl "
              onChange={ handleChange }
            ></textarea>
            <button className="lg:w-25 md:w-20 sm:w-15 bg-black text-white text-lg border-2 border-white rounded-2xl">Submit</button>
          </form>
        </div>
      </>
    );
}