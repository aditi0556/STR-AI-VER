import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import api from "../../api.js";
import { useState,useEffect } from "react"
import { useNavigate } from "react-router";
import Sidebar from "../Sidebar.jsx";
export default function Questions_asked(){
    const navigate=useNavigate();
    const [valid,setValid]=useState(false);
    const [del, setDel] = useState(false);
    const [posts,setPosts]=useState([]);
    const [id,setId]=useState("");
    const { getToken }=useAuth();
    useEffect(()=>{
        get_qs();
    },[]);
    const get_qs=async ()=>{
        const token=await getToken();
        try{
            const res=await api.get("/questions/posts",{
            headers:{Authorization:`Bearer ${token}`},
            });
            setPosts([...res.data]);
            console.log(res.data);
        }
        catch(err){
            setValid(true);
            console.log(err);
        }

    }
    const handleEdit=async ()=>{
        console.log("yes");
    }
    const handleDelete = async (id) => {
      const token=await getToken();
      try{
        const res=await api.delete(`/questions/delete/${id}`,{
          headers:{Authorization:`Bearer ${token}`}
        })
        console.log(res);
        navigate("/discuss");
      }
      catch(err){
        setDel(true);
        console.log(err);
      }
    };
    return (
      <>
        <div className="flex flex-row max-w-screen">
          <Sidebar/>
          <div className="flex flex-col  items-center min-h-screen w-screen bg-gray-900 text-white">
            <h1 className="text-5xl font-bold my-5">Posts</h1>
            {posts.map((qs, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start justify-center my-2.5 p-5 bg-gray-800 border-2 rounded-2xl md:max-w-3xl max-w-xl mx-2"
              >
                <h1 className="text-white text-2xl my-2.5">
                  <p className="font-bold inline text-3xl">Title</p>:{qs.title}
                </h1>
                <h1 className="text-white text-2xl my-2.5">
                  <p className="font-bold inline text-3xl">Description</p>:
                  {qs.q_desc}
                </h1>
                <div>
                  <button
                    className=" md:w-30 h-10 hover:scale-110 bg-blue-800 text-white border-2 rounded-xl w-25"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className=" md:w-30 h-10 mx-2.5 hover:scale-110 bg-blue-800 text-white border-2 rounded-xl w-25"
                    onClick={() => {
                      handleDelete(qs.q_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!posts.length && (
              <h className="text-white text-2xl">You have no posts</h>
            )}
            {valid && <RedirectToSignIn />}
            {del && <RedirectToSignIn />}
          </div>
        </div>
      </>
    );
}