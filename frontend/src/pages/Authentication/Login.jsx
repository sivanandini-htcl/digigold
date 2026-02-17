import { useState } from "react";
import { useNavigate } from "react-router-dom";


  function Login({ closeModal, switchToSignup }) {
  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96 relative">
      
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-3 rounded-lg bg-gray-700 text-white"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white"
      />

      <button className="w-full text-gray-700 bg-white py-3 rounded-lg
       font-semibold">
        Send OTP
      </button>

      <p className="text-gray-400 text-sm mt-4 text-center">
        Don’t have an account?{" "}
        <span
          onClick={switchToSignup}
          className="text-yellow-400 cursor-pointer hover:underline"
        >
          Signup
        </span>
      </p>
    </div>
  );
}

export default Login;
