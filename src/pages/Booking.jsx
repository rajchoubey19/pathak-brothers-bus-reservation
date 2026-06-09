import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Booking() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const fetchBookedSeats = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const seats = querySnapshot.docs.map((doc) => doc.data().selectedSeat);
      setBookedSeats(seats);
      setLoading(false);
    };

    fetchBookedSeats();
  }, []);

  const Seat = ({ seatNo }) => {
    const isBooked = bookedSeats.includes(seatNo);
    const isSelected = selectedSeat === seatNo;

    return (
      <div
        onClick={() => {
          if (!isBooked) {
            setSelectedSeat(seatNo);
          }
        }}
        className={`w-10 h-10 border-2 flex items-center justify-center rounded-t-xl rounded-b-md text-[10px] font-bold transition-all
          ${
            isBooked
              ? "bg-red-500 border-red-500 text-white cursor-not-allowed"
              : isSelected
              ? "bg-yellow-400 border-yellow-400 text-black cursor-pointer hover:scale-105"
              : "border-green-500 text-green-500 cursor-pointer hover:scale-105"
          }`}
      >
        {seatNo}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-8">

      <h1 className="text-5xl font-bold text-center mb-10">
        Select Your Seat
      </h1>

      <p className="text-center text-yellow-400 text-xl mb-6">
     Bus: {state?.busName}
     </p>

      {loading && (
  <p className="text-center text-yellow-400 mb-6">
    Loading booked seats...
  </p>
     )}

      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex justify-between items-center bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
          <span className="text-zinc-400 font-semibold tracking-widest uppercase">
            Front
          </span>

          <div className="w-12 h-12 flex items-center justify-center bg-zinc-800 border border-zinc-600 rounded-full text-2xl">
            🛞
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-zinc-900 border-2 border-zinc-700 rounded-[50px] p-6 shadow-2xl">

        <div className="flex justify-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span>Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Booked</span>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-y-3 gap-x-2 justify-items-center">
          {Array.from({ length: 9 }, (_, row) => (
            <React.Fragment key={row}>
              <Seat seatNo={row * 5 + 1} />
              <Seat seatNo={row * 5 + 2} />

              <div className="w-16"></div>

              <Seat seatNo={row * 5 + 3} />
              <Seat seatNo={row * 5 + 4} />
              <Seat seatNo={row * 5 + 5} />
            </React.Fragment>
          ))}
        </div>

        {selectedSeat && (
          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-yellow-400">
              Selected Seat: {selectedSeat}
            </p>

            <button
           onClick={() => {
           navigate("/otp", {
            state: {
             selectedSeat: selectedSeat,
            busName: state?.busName,
          },
         });
         }}
         className="mt-4 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
        >
         Continue Booking
        </button>
          </div>
        )}

      </div>

    </div>
  );
}