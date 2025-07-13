import { useParams } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../api.js";
export default function Update_ans() {
  const navigate=useNavigate();
  const { getToken } = useAuth();
  const [ans, setAns] = useState("");
  const { answer_id } = useParams();
  function handleChange(e) {
    setAns(e.target.value);
  }
  const update_ans = async () => {
    const token = await getToken();
    try {
      const response = await api.patch(`/answers/update/${answer_id}`, {ans}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/discuss");
    } catch (err) {
      console.log(err);
    }
  };
  function handleSubmit(event) {
    event.preventDefault();
    update_ans();
  }
  return (
    <>
      <div className="flex flex-col  items-center bg-gray-700 min-h-screen">
        <h1 className="text-3xl pt-5 text-white font-bold">
          Update Your Answer
        </h1>
        <form className="w-full pt-10 px-55" onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            name="desc"
            required
            rows="10"
            className="ml-2 p-2.5 w-full max-w-5xl bg-gray-900 text-white text-xl  resize-none border-3 border-black rounded-2xl "
            placeholder="Answer this question...."
          ></textarea>
          <br />
          <button className="ml-2  w-25 h-10 my-2 bg-black text-white text-lg border-2 border-white rounded-2xl">
            Post
          </button>
        </form>
      </div>
    </>
  );
}
