
import { useState } from "react";
import { Link } from "react-router-dom";
import Signup from "../pages/Authentication/Signup";
import Login from "../pages/Authentication/Login";
import Profile from "../pages/Profile";

function Header() {
  const [modalType, setModalType] = useState(null);

  return (
    <>
      <header className="bg-[oklch(13%_0.028_261.692)] 
      text-white text-lg font-bold w-full m-2 p-2 flex justify-end shadow-2xl shadow-black">
        
        <nav className="flex px-2 py-2 m-2 gap-2 items-center">
          <Link to="/" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/gold" className="hover:text-gray-300">Gold</Link>
          <Link to="/silver" className="hover:text-gray-300">Silver</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>


          {/* Profile Icon */}
        <button
  onClick={() => setModalType("signup")}
  className="hover:text-yellow-400 transition"
>
 <svg xmlns="http://www.w3.org/2000/svg" width="22"
     height="22" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
</button>
          <Link to="/" className="hover:text-gray-300">About</Link>
        </nav>
      </header>

      {/* Modal Container */}
      {modalType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          
          {modalType === "signup" && (
            <Signup
              closeModal={() => setModalType(null)}
              switchToLogin={() => setModalType("login")}
            />
          )}

          {modalType === "login" && (
            <Login closeModal={() => setModalType(null)} switchToSignup={() => setModalType("signup")}
            />
          )}

        </div>
      )}
    </>
  );
}

export default Header;
