// AuthOverlay.jsx
import { useLocation } from "react-router-dom";
import { SignedOut, SignIn } from "@clerk/clerk-react";

export default function AuthOverlay() {
  const location = useLocation();
  const hideSignInOnHome = location.pathname === "/";

  if (hideSignInOnHome) return null;

  return (
    <SignedOut>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <SignIn routing="hash" />
      </div>
    </SignedOut>
  );
}
