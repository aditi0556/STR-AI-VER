// import { useEffect, useState } from "react";
// import Supabase from "./Supabase.jsx"

// function App() {
//   const [user, setUser] = useState([]);

//   useEffect(() => {
//     getUser();
//   }, []);

//   async function getUser() {
//     const { data } = await Supabase.from("users").select().eq("username","aditi");
//     setUser(data);
//   }

//   return (
//     <ul>
//      {user}
//     </ul>
//   );
// }

// export default App;
