import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@pathak.com" && password === "123456") {
      localStorage.setItem("adminLogin", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}