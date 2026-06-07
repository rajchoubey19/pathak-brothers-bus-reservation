import { useNavigate } from "react-router-dom";

export default function Buses() {
  const navigate = useNavigate();
  const buses = [
    { id: 1, time: "8:00 PM" },
    { id: 2, time: "9:00 PM" },
    { id: 3, time: "10:00 PM" },
    { id: 4, time: "11:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-8">
    <h1 className="text-5xl font-bold text-center mb-10 text-yellow-400">
        Available Buses
      </h1>

      {buses.map((bus) => (
  <div
    key={bus.id}
    className="bg-zinc-900 border border-zinc-700 rounded-3xl p-5 shadow-xl mb-4 flex justify-between items-center"
  >
    <div>
      <h2 className="text-2xl font-bold text-yellow-400">
        🚌 Shiv Shakti
      </h2>

      <p className="text-zinc-400">
        Non-AC Seater
      </p>

      <p className="mt-2">
        Departure: {bus.time}
      </p>
    </div>

     <button
  onClick={() => navigate("/booking")}
  className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold hover:scale-105 transition"
>
  Book Now
</button>
    </div>
   ))}

    </div>
  );
}