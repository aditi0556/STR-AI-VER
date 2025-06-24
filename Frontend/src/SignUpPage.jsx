import { useSession, useUser, SignUp, SignIn } from "@clerk/clerk-react";
import createClerkSupabaseClient from "./utils/createClerkSupabaseClient";
import { useEffect } from "react";
import { useRef } from "react";

export default function SignUpPage() {
  const { isLoaded, session } = useSession();
  const { isSignedIn, user } = useUser();
  const hasInserted = useRef(false);
  // console.log(session);
  useEffect(() => {
    
    if (isLoaded && isSignedIn && session && !hasInserted.current) {
      hasInserted.current = true;
      // console.log(session);
      // console.log("adi");
      handleUserSignup();
    }
  }, [isLoaded, isSignedIn, session, user]);

  async function handleUserSignup() {
    const client = createClerkSupabaseClient(session);
    const userId = user?.id;
    const { data: existingUser, error: fetchError } = await client
      .from("allUsers")
      .select("user_id")
      .eq("user_id", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking user existence:", fetchError);
      return;
    }

    if (existingUser) {
      console.log("User already exists, skipping insert.");
      return;
    }

    const { data, error } = await client.from("allUsers").insert([
      {
        user_id: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
        first_name: user?.firstName,
        last_name: user?.lastName,
        created_at: user?.createdAt,
        updated_at: user?.updatedAt,
        username: user?.username,
      },
    ]);

    if (error) console.error("Error inserting user:", error);
    else console.log("User added successfully!", data);
  }

  return (
    // <div className="flex flex-col justify-center items-center h-screen">
    //   <SignUp routing="hash" />
    // </div>
    console.log("yes")
  );
}
