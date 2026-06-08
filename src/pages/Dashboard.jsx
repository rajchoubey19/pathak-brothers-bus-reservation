import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(data);
    };

    fetchBookings();
  }, []);

  const totalBookings = bookings.length;
  const bookedSeats = bookings.length;
  const totalSeats = 45;
  const availableSeats = totalSeats - bookedSeats;
  const deleteBooking = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this booking?"
  );

  if (!confirmDelete) return;

  await deleteDoc(doc(db, "bookings", id));

  setBookings(bookings.filter((booking) => booking.id !== id));
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">
        Admin Panel
      </h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Total Bookings</h2>
          <p className="text-3xl font-bold text-yellow-400">
            {totalBookings}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Booked Seats</h2>
          <p className="text-3xl font-bold text-red-400">
            {bookedSeats}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Available Seats</h2>
          <p className="text-3xl font-bold text-green-400">
            {availableSeats}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Bus Name</h2>
          <p className="text-xl font-bold text-blue-400">
            Shiv Shakti
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-zinc-900 border border-zinc-700 rounded-3xl p-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-yellow-400 border-b border-zinc-700">
              <th className="p-3">Booking ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Seat</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Age</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-zinc-800">
                <td className="p-3">{booking.bookingId}</td>
                <td className="p-3">{booking.name}</td>
                <td className="p-3">{booking.selectedSeat}</td>
                <td className="p-3">{booking.mobile}</td>
                <td className="p-3">{booking.gender}</td>
                <td className="p-3">{booking.age}</td>

                <td className="p-3">
            <button
             onClick={() => deleteBooking(booking.id)}
             className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
             >
             Delete
            </button>
             </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}