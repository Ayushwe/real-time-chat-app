import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [fullName, setFullName] = useState("");

  const {handleRegister}=useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      await handleRegister(fullName, email, password);
      navigate("/chat"); 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-[600px]">
        <div className="w-full pl-10 pr-10 pb-15 pt-15">
          <div className="text-center mb-8">
            <img
              src="./src/assets/logo.png"
              alt="Logo"
              className="w-28 h-auto mx-auto"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              Create an account
            </h2>
          </div>
          {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password *
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Or, Sign up with</p>
            <button className="mt-4 w-full py-2 border rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100">
              <img
                src="./src/assets/google.png"
                alt="Google"
                className="w-8 h-8 mr-2"
              />
              Sign up with Google
            </button>
          </div>
          <p className="mt-3 text-center text-gray-600 pb-5">
            Already have an account?
            <span
              onClick={() => navigate("/auth")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
