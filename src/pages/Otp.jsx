import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Otp() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
  if (timer > 0) {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }
}, [timer]);

  const sendOtp = () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();

    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setTimer(30);

    alert(`Your OTP is ${newOtp}`);
  };

  const verifyOtp = () => {
    if (!otpSent) {
      alert("Please send OTP first");
      return;
    }

    if (otp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }

    navigate("/passenger", {
  state: {
    selectedSeats: state?.selectedSeats,
    busName: state?.busName,
    fare: state?.fare,
    from: state?.from,
    to: state?.to,
    date: state?.date,
      },
    })
  };

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
          Selected Seats: {state?.selectedSeats?.join(", ")}
        </p>

        <p className="text-center text-zinc-400 mb-2">
  {state?.from || "N/A"} → {state?.to || "N/A"}
</p>

<p className="text-center text-zinc-400 mb-4">
  Journey Date: {state?.date || "N/A"}
</p>

        <input
          type="tel"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
        />

        <button
        onClick={sendOtp}
        disabled={timer > 0}
        className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold mb-6 disabled:opacity-50"
        >
        {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
         </button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
}