import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

export default function Buses() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [buses, setBuses] = useState([]);
  const [routeBookings, setRouteBookings] = useState(0);
  useEffect(() => {
  const fetchRoutes = async () => {
    const querySnapshot = await getDocs(collection(db, "routes"));

    const bookingSnapshot = await getDocs(collection(db, "bookings"));

const bookingsData = bookingSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

const filteredBookings = bookingsData.filter(
  (booking) =>
    booking.fromCity?.toLowerCase().trim() === state?.from?.toLowerCase().trim() &&
booking.toCity?.toLowerCase().trim() === state?.to?.toLowerCase().trim()
);

setRouteBookings(filteredBookings.length);
    const routesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredRoutes = routesData.filter(
      (bus) =>
        bus.from?.toLowerCase().trim() === state?.from?.toLowerCase().trim() &&
bus.to?.toLowerCase().trim() === state?.to?.toLowerCase().trim()
    );

    setBuses(filteredRoutes);
  };

  fetchRoutes();
}, [state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-8">
    <h1 className="text-5xl font-bold text-center mb-10 text-yellow-400">
        Available Buses
      </h1>

      <div className="text-center mb-8">
  <p className="text-yellow-400 text-2xl font-bold">
    {state?.from || "N/A"} → {state?.to || "N/A"}
  </p>

  <p className="text-zinc-400 mt-2">
    Journey Date: {state?.date || "N/A"}
  </p>
</div>

   {buses.length === 0 && (
  <div className="text-center bg-zinc-900 border border-zinc-700 rounded-3xl p-8 max-w-xl mx-auto">
    <h2 className="text-2xl font-bold text-yellow-400 mb-3">
      No buses available
    </h2>

    <p className="text-zinc-400">
      No buses found for this route. Please try another route or date.
    </p>
  </div>
)}

      {buses.map((bus) => (
  <div
    key={bus.id}
    className="bg-zinc-900 border border-zinc-700 rounded-3xl p-5 shadow-xl mb-4 flex justify-between items-center"
  >
    <div>
      <h2 className="text-2xl font-bold text-yellow-400">
       🚌 {bus.busName}
      </h2>

      <p className="text-zinc-400">
      {bus.type} 
     </p>

      <p className="mt-2">
        Departure: {bus.time}
      </p>

      <p className="text-blue-400 font-semibold mt-1">
      Seats Available: {45 - routeBookings}
     </p>

      <p className="text-green-400 font-bold mt-2">
      ₹{bus.fare}
     </p>
    </div>

     <button
  onClick={() =>
    navigate("/booking", {
    state: {
  busName: bus.busName,
  from: state?.from,
  to: state?.to,
  date: state?.date,
},  

    })
  }
  className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold hover:scale-105 transition"
>
  Book Now
</button>
    </div>
   ))}

    </div>
  );
}