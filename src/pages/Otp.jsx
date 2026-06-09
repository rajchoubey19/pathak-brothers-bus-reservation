import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Otp() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
const { state } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
          OTP Login
        </h1>

        <p className="text-yellow-400 text-center mb-2">
       Bus: {state?.busName}
       </p>

        <p className="text-center text-yellow-400 mb-4">
       Selected Seat: {state?.selectedSeat}
        </p>

        <input
          type="tel"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
        />

        <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold mb-6">
          Send OTP
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
        />

        <button
  onClick={() =>
    navigate("/passenger", {
      state: {
  selectedSeat: state?.selectedSeat,
  busName: state?.busName,
   },
    })
  }
  className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
  Verify OTP
</button>
      </div>

    </div>
  );
}