import { formatDate } from "../utils/dateFormat";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Booking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const fetchBookedSeats = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const seats = querySnapshot.docs.flatMap((doc) => {
  const data = doc.data();

  if (data.selectedSeats) {
    return data.selectedSeats;
  }

  return [Number(data.selectedSeat)];
});

setBookedSeats(seats);

      setLoading(false);
    };

    fetchBookedSeats();
  }, []);

  const Seat = ({ seatNo }) => {
    const isBooked = bookedSeats.includes(seatNo);
    const isSelected = selectedSeats.includes(seatNo);

    return (
      <button
        onClick={() => {
  if (isBooked) return;

  if (selectedSeats.includes(seatNo)) {
    setSelectedSeats(
      selectedSeats.filter((seat) => seat !== seatNo)
    );
  } else {
    setSelectedSeats([...selectedSeats, seatNo]);
  }
}}
        disabled={isBooked}
        className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all
          ${
            isBooked
              ? "bg-red-500 border-red-500 text-white cursor-not-allowed opacity-90"
              : isSelected
              ? "bg-yellow-400 border-yellow-400 text-black scale-110 shadow-lg"
              : "bg-black border-green-500 text-green-400 hover:bg-green-500 hover:text-black hover:scale-105"
          }`}
      >
        {seatNo}
      </button>
    );
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6 md:p-8 pb-28">      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
        Select Your Seat
      </h1>

      <p className="text-center text-yellow-400 text-xl mb-4">
        Bus: {state?.busName || "Shiv Shakti"}
      </p>

      <p className="text-center text-zinc-400 mb-1">
  {state?.from || "N/A"} → {state?.to || "N/A"}
</p>

<p className="text-center text-zinc-400 mb-6">
  Journey Date: {state?.date || "N/A"}
</p>

      {loading && (
        <p className="text-center text-yellow-400 mb-6">
          Loading booked seats...
        </p>
      )}

      <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-700 rounded-[32px] overflow-hidden shadow-2xl">

        <div className="bg-zinc-900 border-b border-zinc-700 p-5">
          <div className="flex justify-between items-center bg-black border border-zinc-700 rounded-2xl px-6 py-4">
            <div>
              <p className="text-zinc-400 text-xs tracking-[0.35em] uppercase">
                Front
              </p>
              <p className="text-yellow-400 font-bold text-sm mt-1">
                Driver Side
              </p>
            </div>

            <div className="w-12 h-12 rounded-full border border-yellow-400 flex items-center justify-center text-2xl">
              🛞
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-center gap-6 mb-8 text-sm flex-wrap">
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

          <div className="bg-zinc-900 border border-zinc-700 rounded-[28px] p-5 md:p-7">
            <div className="grid grid-cols-6 gap-y-4 gap-x-3 justify-items-center">
              {Array.from({ length: 9 }, (_, row) => (
                <React.Fragment key={row}>
                  <Seat seatNo={row * 5 + 1} />
                  <Seat seatNo={row * 5 + 2} />

                  <div className="w-10 md:w-16"></div>

                  <Seat seatNo={row * 5 + 3} />
                  <Seat seatNo={row * 5 + 4} />
                  <Seat seatNo={row * 5 + 5} />
                </React.Fragment>
              ))}
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-2xl font-bold text-yellow-400">
                Selected Seats: {selectedSeats.join(", ")}
              </p>

              <button
                onClick={() => {
                  navigate("/otp", {
                  state: {
                 selectedSeats: selectedSeats,
                 busName: state?.busName,
                 fare: state?.fare,
                 from: state?.from,
                 to: state?.to,
                 date: state?.date,
                 },
                });
                }}
                className="mt-4 bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
              >
                Continue Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}