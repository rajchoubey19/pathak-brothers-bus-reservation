import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Passenger() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
const { state } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
          Passenger Details
        </h1>
        <p className="text-yellow-400 text-center mb-4">
        Selected Seat: {state?.selectedSeat}
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-6"
        />

        <button
  onClick={() => {
    const bookingId = "PB" + Math.floor(100000 + Math.random() * 900000);

    navigate("/ticket", {
      state: {
        name,
        age,
        gender,
        mobile,
        email,
        bookingId,
        selectedSeat: state?.selectedSeat,
      },
    });
  }}
  className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
  Confirm Booking
   </button>
      </div>

    </div>
  );
}