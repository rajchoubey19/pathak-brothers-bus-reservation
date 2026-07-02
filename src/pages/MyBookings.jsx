import { formatDate } from "../utils/dateFormat";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function MyBookings() {
  const [mobile, setMobile] = useState("");
  const [bookings, setBookings] = useState([]);
const [filteredBookings, setFilteredBookings] = useState([]);
const [searched, setSearched] = useState(false);

   const searchBookings = async () => {
  const querySnapshot = await getDocs(collection(db, "bookings"));

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const results = data.filter(
    (booking) => booking.mobile === mobile
  );

  setFilteredBookings(results);
  setSearched(true);
};

const cancelBooking = async (bookingId) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmCancel) return;

  try {
    await deleteDoc(doc(db, "bookings", bookingId));

    setFilteredBookings(
      filteredBookings.filter(
        (booking) => booking.id !== bookingId
      )
    );

    alert("Booking Cancelled Successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to cancel booking");
  }
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

      {searched && filteredBookings.length === 0 && (
  <div className="max-w-md mx-auto mt-8 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 text-center">
    <h2 className="text-2xl font-bold text-yellow-400 mb-2">
      No Bookings Found
    </h2>
    <p className="text-zinc-400">
      No booking found for this mobile number.
    </p>
  </div>
)}

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
      <p>📅 Date: {formatDate(state?.journeyDate)}</p>
      <p>🎫 Booking ID: {booking.bookingId}</p>
      {booking.passengers && booking.passengers.length > 0 && (
  <div className="mt-4">
    <h3 className="text-yellow-400 font-bold mb-2">
      Passengers
    </h3>

    {booking.passengers.map((passenger, index) => (
      <div
        key={index}
        className="bg-black border border-zinc-700 rounded-xl p-3 mb-2"
      >
        <p>👤 {passenger.name}</p>
        <p>🎂 Age: {passenger.age}</p>
        <p>🚻 Gender: {passenger.gender}</p>
        <p>💺 Seat: {passenger.seat}</p>
      </div>
    ))}
  </div>
)}
      <p className="text-green-400 font-bold mt-3">
        Status: Confirmed
      </p>
      <button
  type="button"
  onClick={() => {
    console.log("Cancel clicked", booking.id);
    cancelBooking(booking.id);
  }}
  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-bold"
>
  Cancel Booking
</button>
    </div>
  ))}
</div>

    </div>
  );
}