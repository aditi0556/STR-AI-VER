import api from "./api.js"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react"

function SignUpPage(){
  const { user,isSignedIn }=useUser();
  async function syncuser(){
    if(user){
      try{
        const response=await api.post("/users/add",{
          user_id:user.id,
          email:user.emailAddresses[0]?.emailAddress,
          username:user.username,
          first_name:user.firstName,
          last_name:user.lastName,
          created_at:user.createdAt,
          updated_at:user.updatedAt
        });
        console.log(response);
      }
      catch(err){
        console.log("failed to add user");
      }
    }
  }
  useEffect(()=>{
    syncuser();
  });
  return null;
}
export default SignUpPage;