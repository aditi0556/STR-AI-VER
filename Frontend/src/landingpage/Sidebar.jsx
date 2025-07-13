import { useNavigate } from "react-router-dom";
export default function Sidebar(){
    const navigate=useNavigate();
    return (
      <>
        <div className="flex flex-col w-20 md:w-54 ml-0 p-2.5 pt-50 min-h-screen bg-black">
          <h1
            className="text-white text-xl my-1.5 cursor-pointer hover:border-2 hover:rounded-xl p-2.5 hover:bg-gray-900 "
            onClick={() => {
              navigate("/addquestion");
            }}
          >
            Ask
          </h1>
          <h1
            className="hover:border-2 hover:rounded-xl p-2.5 hover:bg-gray-900 text-white text-xl my-1.5"
            onClick={() => navigate("/asked")}
          >
            Questions Asked
          </h1>
          <h1
            className="hover:border-2 hover:rounded-xl p-2.5 hover:bg-gray-900 text-white text-xl my-1.5"
            onClick={() => {
              navigate("/answered");
            }}
          >
            Answered
          </h1>
        </div>
      </>
    );
}