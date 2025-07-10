import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import SignUpPage from "../SignUpPage.jsx"
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  function handleClick() {
    setOpen((open) => !open);
  }
  function handleToggle() {
    document.body.classList.toggle("dark");
    setToggle(!toggle);
  }
  return (
    <>
      {/* Hamburger menu button: visible only on small/medium screens */}

      <Menubar
        className={`fixed top-0 left-0 w-screen h-15 bg-black/[1] z-50 text-white shadow-lg border-0 flex flex-column lg:flex-row 
      `}
      >
        <MenubarMenu className="px-4 flex items-center">
          {/* <Braces size={40} strokeWidth={3.0} /> */}
          <img src="/newLogo.png" alt="img" className="h-15" />
        </MenubarMenu>
        &nbsp;&nbsp;
        {/* All other MenubarMenu: hidden on sm/md, visible on lg+ */}
        <MenubarMenu>
          <button
            className=" hidden lg:flex hover:text-white hover:font-bold drop-shadow-lg hover:text-lg transition-all duration-300"
            onClick={() => navigate("/")}
          >
            <Link smooth to="/">
              Home
            </Link>
          </button>
        </MenubarMenu>
        &nbsp;
        <MenubarMenu>
          <MenubarTrigger className="  hover:text-white hover:font-bold drop-shadow-lg hover:text-lg transition-all duration-300">
            {/* <a href="#rdMap">Roadmap</a> */}
            <Link smooth to="/map">
              RoadMap
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        &nbsp;
        <button
          className="lg:hidden ml-auto z-50"
          onClick={handleClick}
          aria-label="Toggle menu"
        >
          <Menu size={30} strokeWidth={3.0} />
        </button>
        {open && (
          <div className=" px-4 flex flex-col justify-items-start  w-screen bg-black text-lg font-bold text-white z-40 fixed top-2">
            <div className="h-15 p-2 hover:bg-gray-800 hover:border-2 rounded-2xl">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
            <div className="h-15 p-2 hover:bg-gray-800 hover:border-2  rounded-2xl">
              <button className=" lg:flex hover:text-white hover:font-bold drop-shadow-lg hover:text-xl transition-all duration-300">
                {/* onClick={() => navigate("/")} */}
                <Link smooth to="/">
                  Home
                </Link>
              </button>
            </div>
            <div className="h-15 p-2 hover:bg-gray-800 hover:border-2 rounded-2xl ">
              <button
                className="lg:flex hover:text-white hover:font-bold drop-shadow-lg hover:text-xl transition-all duration-300"
                onClick={() => navigate("/Doubts")}
              >
                Doubts
              </button>
            </div>
            <div className="h-15 p-2 hover:bg-gray-800 hover:border-2 rounded-2xl ">
              <Link smooth to="/map">
                RoadMap
              </Link>
              {/* <a href="/#rdMap">RoadMap</a> */}
            </div>
            <div></div>
            {/* <div className="h-15 p-2 hover:bg-gray-800 hover:border-2 rounded-2xl ">
              <FontAwesomeIcon icon={faMoon} />
            </div> */}
          </div>
        )}
        <MenubarMenu>
          <button
            className="cursor-pointer  hidden lg:flex hover:text-white hover:font-bold drop-shadow-lg hover:text-lg transition-all duration-300"
            onClick={() => navigate("/Doubts")}
          >
            Doubts
          </button>
        </MenubarMenu>
        &nbsp;
         <MenubarMenu>
          <MenubarTrigger className=" hidden lg:flex hover:text-white hover:font-bold drop-shadow-lg hover:text-lg transition-all duration-300"
          onClick={()=> navigate("/discuss")}>
            Discuss
          </MenubarTrigger>
        </MenubarMenu> 
        {/* <MenubarMenu >  
         <MenubarTrigger className=" hidden lg:flex ml-auto hover:text-white hover:font-bold hover:text-larger drop-shadow-2xl transition-all duration-300"> 
         <CircleUserRound size={30} absoluteStrokeWidth={true} strokeWidth={3.0}/> &nbsp;&nbsp;
           <SignInButton>
              <button>SignUp</button>
           </SignInButton>
         </MenubarTrigger>   
        </MenubarMenu> 
        &nbsp; 
        <MenubarMenu > 
         <MenubarTrigger className=" hidden lg:flex ml-15px mr-2px hover:text-white hover:font-bold hover:text-larger drop-shadow-2xl transition-all duration-300"> 
           <SignOutButton>
             <button>Sign Out</button>
           </SignOutButton>
         </MenubarTrigger>    
        </MenubarMenu>   */}
        {/* <MenubarMenu>
          <MenubarTrigger className=" hidden lg:flex ml-auto  hover:text-white hover:font-bold hover:text-larger drop-shadow-2xl transition-all duration-300">
            <div onClick={handleToggle}>
              {!toggle ? (
                <FontAwesomeIcon icon={faMoon} className="text-4xl" />
              ) : (
                <FontAwesomeIcon icon={faSun} className="text-4xl" />
              )}
            </div>
          </MenubarTrigger>
        </MenubarMenu> */}
        &nbsp;&nbsp;
        <MenubarMenu>
          <header className="hidden lg:flex font-bold hover:text-larger  hover:font-bold hover:text-larger drop-shadow-2xl transition-all duration-300 ml-auto">
            <SignedIn>
              <UserButton />
              <SignUpPage/>
            </SignedIn>
            <SignedOut>
              <SignInButton />
              <SignUpPage/>
            </SignedOut>
          </header>
        </MenubarMenu>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </Menubar>
    </>
  );
}

// function toggleDarkMode() {
//   document.body.classList.toggle("dark-mode");
//   localStorage.setItem(
//     "darkMode",
//     document.body.classList.contains("dark-mode")
//   );
// }

// // Apply saved preference on page load
// window.onload = function () {
//   if (localStorage.getItem("darkMode") === "true") {
//     document.body.classList.add("dark-mode");
//   }
// };
