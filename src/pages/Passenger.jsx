import { formatDate } from "../utils/dateFormat";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";


export default function Passenger() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const { state } = useLocation();
  useEffect(() => {
  if (state?.selectedSeats) {
    const passengerData = state.selectedSeats.map((seat) => ({
      seat,
      name: "",
      age: "",
      gender: "",
    }));

    setPassengers(passengerData);
  }
}, [state]);

  return (
<div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-6 pb-28">
<div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl mb-24">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
          Passenger Details
        </h1>
        <p className="text-yellow-400 text-center mb-4">
        Selected Seats: {state?.selectedSeats?.join(", ")}
        </p>

        <p className="text-yellow-400 text-center mb-4">
        Bus: {state?.busName}
        </p>

        <p className="text-zinc-400 text-center mb-2">
  {state?.from || "N/A"} → {state?.to || "N/A"}
</p>

<p className="text-zinc-400 text-center mb-4">
  Journey Date: {state?.date || "N/A"}
</p>

        {passengers.map((passenger, index) => (
  <div
    key={index}
    className="bg-black border border-zinc-700 rounded-2xl p-4 mb-4"
  >
    <h3 className="text-yellow-400 font-bold mb-3">
      Passenger {index + 1} (Seat {passenger.seat})
    </h3>

    <input
      type="text"
      placeholder="Full Name"
      value={passenger.name}
      onChange={(e) => {
        const updated = [...passengers];
        updated[index].name = e.target.value;
        setPassengers(updated);
      }}
      className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl mb-3"
    />

    <input
      type="number"
      placeholder="Age"
      value={passenger.age}
      onChange={(e) => {
        const updated = [...passengers];
        updated[index].age = e.target.value;
        setPassengers(updated);
      }}
      className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl mb-3"
    />

    <select
      value={passenger.gender}
      onChange={(e) => {
        const updated = [...passengers];
        updated[index].gender = e.target.value;
        setPassengers(updated);
      }}
      className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl"
    >
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
  </div>
))}

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

        <input
       type="date"
       value={journeyDate}
       onChange={(e) => setJourneyDate(e.target.value)}
       className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-6"
       />
       
       <select
      value={fromCity}
      onChange={(e) => setFromCity(e.target.value)}
      className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4"
      >
      <option value="">Select From City</option>
     <option>Indore</option>
     <option>Bhopal</option>
     <option>Ujjain</option>
     <option>Maihar</option>
     <option>Kashi</option>
     </select>

    <select
  value={toCity}
  onChange={(e) => setToCity(e.target.value)}
  className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-6"
>
  <option value="">Select To City</option>
  <option>Indore</option>
  <option>Bhopal</option>
  <option>Ujjain</option>
  <option>Maihar</option>
  <option>Kashi</option>
      </select>

        <button
       onClick={async () => {
        const bookingId =
      "PB" + Math.floor(100000 + Math.random() * 900000);

         if (fromCity === toCity) {
           alert("From City and To City cannot be the same");
          return;
         }
       try {
      await addDoc(collection(db, "bookings"), {
  passengers,
  mobile,
  email,
  bookingId,
  selectedSeats: state?.selectedSeats,
  selectedSeat: state?.selectedSeats?.join(", "),
  busName: state?.busName || "Shiv Shakti",
  journeyDate: state?.date || "N/A",
  fromCity: state?.from || "N/A",
  toCity: state?.to || "N/A",
  createdAt: new Date(),
  fare: state?.fare || 0,
  totalFare:
    (Number(state?.fare) || 0) *
    (state?.selectedSeats?.length || 1),
});

      navigate("/ticket", {
        state: {
          passengers,
          mobile,
          email,
          bookingId,
          selectedSeats: state?.selectedSeats,
          selectedSeat: state?.selectedSeats?.join(", "),
          busName: state?.busName,
          journeyDate: state?.date,
          fromCity: state?.from,
          toCity: state?.to,
          fare: state?.fare,
          totalFare: (Number(state?.fare) || 0) * (state?.selectedSeats?.length || 1),
        },
      });
       } catch (error) {
      console.error("Booking Error:", error);
alert(error.message);
    }
    }}
       className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
       >
       Confirm Booking
      </button>
      </div>

    </div>
  );
}