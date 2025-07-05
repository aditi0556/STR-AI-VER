import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/landingpage/Home Page/Home.jsx";
import Doubts from "./landingpage/Problems/Doubts.jsx";
import Debug from "./landingpage/CodeEditor/Debug.jsx";
import Optimise from "./landingpage/CodeEditor/Optimise.jsx";
import Solve from "./landingpage/CodeEditor/Solve.jsx";
import Hints from "./landingpage/CodeEditor/Hints.jsx";
import "./index.css";
import ScrollToTop from "./ScrollToTop.jsx";
import Privacy from "./landingpage/Privacy.jsx";
import Terms from "./landingpage/Terms.jsx";
import SignUpPage from "./SignUpPage.jsx";
import Map from "./landingpage/Roadmap/Map.jsx";
import AuthOverlay from "./AuthOverlay";
import { ClerkProvider, RedirectToSignIn, SignIn } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUpButton,
} from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <Router>
    <ScrollToTop />
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      {/* <ClerkProvider afterSignOutUrl="/"> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedOut>
                <Home />
              </SignedOut>
              <SignedIn>
                <SignUpPage />
                <Home />
              </SignedIn>
            </>
          }
        />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/Doubts"
          element={
            <>
              {/* <SignedOut>
                <RedirectToSignIn />
              </SignedOut> */}
              <SignedIn>
                <Doubts />
              </SignedIn>
            </>
          }
        />
        
        <Route
          path="/map"
          element={
            <>
              {/* <SignedOut>
                <RedirectToSignIn />
              </SignedOut> */}
              <SignedIn>
                <Map />
              </SignedIn>
            </>
          }
        />
        <Route path="/Doubts/debug" element={<Debug />} />
        <Route path="/Doubts/optimise" element={<Optimise />} />
        <Route path="/Doubts/solve" element={<Solve />} />
        <Route path="/Doubts/hints" element={<Hints />} />
      </Routes>
      <AuthOverlay />
    </ClerkProvider>
  </Router>
);
