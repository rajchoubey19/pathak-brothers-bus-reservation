import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Booking() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-8">

      <h1 className="text-5xl font-bold text-center mb-10">
        Select Your Seat
      </h1>
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
       <>

    <div
      onClick={() => setSelectedSeat(row * 5 + 1)}
      className={`w-10 h-10 border-2 border-green-500 text-green-500 flex items-center justify-center rounded-t-xl rounded-b-md cursor-pointer text-[10px] font-bold transition-all hover:scale-105 ${
        selectedSeat === row * 5 + 1
  ? "bg-yellow-400 border-yellow-400 text-black"
  : ""
      }`}
    >
      {row * 5 + 1}
    </div>

    <div
      onClick={() => setSelectedSeat(row * 5 + 2)}
      className={`w-10 h-10 border-2 border-green-500 text-green-500 flex items-center justify-center rounded-t-xl rounded-b-md cursor-pointer text-[10px] font-bold transition-all hover:scale-105 ${
        selectedSeat === row * 5 + 2
  ? "bg-yellow-400 border-yellow-400 text-black"
  : ""
      }`}
    >
      {row * 5 + 2}
    </div>

    <div className="w-16"></div>

    <div
      onClick={() => setSelectedSeat(row * 5 + 3)}
      className={`w-10 h-10 border-2 border-green-500 text-green-500 flex items-center justify-center rounded-t-xl rounded-b-md cursor-pointer text-[10px] font-bold transition-all hover:scale-105 ${
        selectedSeat === row * 5 + 3
  ? "bg-yellow-400 border-yellow-400 text-black"
  : ""
      }`}
    >
      {row * 5 + 3}
    </div>

    <div
      onClick={() => setSelectedSeat(row * 5 + 4)}
      className={`w-10 h-10 border-2 border-green-500 text-green-500 flex items-center justify-center rounded-t-xl rounded-b-md cursor-pointer text-[10px] font-bold transition-all hover:scale-105 ${
selectedSeat === row * 5 + 4
  ? "bg-yellow-400 border-yellow-400 text-black"
  : ""      }`}
    >
      {row * 5 + 4}
    </div>

    <div
      onClick={() => setSelectedSeat(row * 5 + 5)}
      className={`w-10 h-10 border-2 border-green-500 text-green-500 flex items-center justify-center rounded-t-xl rounded-b-md cursor-pointer text-[10px] font-bold transition-all hover:scale-105 ${
        selectedSeat === row * 5 + 5
          ? "bg-yellow-400 border-yellow-400 text-black"
          : "border-green-500 text-green-500"
      }`}
    >
      {row * 5 + 5}
    </div>

 </>
))}
        </div>

        {selectedSeat && (
          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-yellow-400">
              Selected Seat: {selectedSeat}
            </p>

            <p className="text-white mb-3">
           Testing Seat: {selectedSeat}
           </p>

            <button
  onClick={() => navigate("/otp", { state: { selectedSeat } })}
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