import Navbar  from "../Navbar.jsx";
import  Background  from "../Background.jsx";
import Footer from "./Footer.jsx";
import AiChat from "../AI Chat/AiChat.jsx";
import { useEffect } from "react";
export default function Home(){
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    return (
      <>
        <Navbar className="absolute top-0  w-full z-20 overflow-hidden" />
        
          <Background/>
         
          <AiChat className="ml-auto" />
          <Footer className=" w-full bottom-0 z-20 overflow-hidden" />
      
      </>
    );
}