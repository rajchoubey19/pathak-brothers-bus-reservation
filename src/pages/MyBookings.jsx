import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function MyBookings() {
  const [mobile, setMobile] = useState("");
  const [bookings, setBookings] = useState([]);
const [filteredBookings, setFilteredBookings] = useState([]);

   const searchBookings = async () => {
  const querySnapshot = await getDocs(
    collection(db, "bookings")
  );

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const results = data.filter(
    (booking) => booking.mobile === mobile
  );

  setFilteredBookings(results);
};  

   return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-8">

      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
        My Bookings
      </h1>

      <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-700 rounded-3xl p-6">

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none"
        />

        <button
  onClick={searchBookings}
  className="w-full mt-4 bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
  Search Bookings
</button>

      </div>

      <div className="max-w-3xl mx-auto mt-8 space-y-4">
  {filteredBookings.map((booking) => (
    <div
      key={booking.id}
      className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6"
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-3">
        {booking.fromCity} → {booking.toCity}
      </h2>

      <p>🚌 Bus: {booking.busName}</p>
      <p>💺 Seat: {booking.selectedSeat}</p>
      <p>📅 Date: {booking.journeyDate}</p>
      <p>🎫 Booking ID: {booking.bookingId}</p>
      <p className="text-green-400 font-bold mt-3">
        Status: Confirmed
      </p>
    </div>
  ))}
</div>

    </div>
  );
}