import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLogin");

    if (isAdmin !== "true") {
     navigate("/admin-login");
    return;
   }

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

  const filteredBookings = bookings.filter(
  (booking) =>
    booking.mobile?.includes(search) ||
    booking.bookingId?.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="flex justify-center mb-6">
  <button
    onClick={() => {
      localStorage.removeItem("adminLogin");
      navigate("/admin-login");
    }}
    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
  >
    Logout
  </button>
     </div>
      <div className="max-w-md mx-auto mb-6">
      <input
        type="text"
        placeholder="Search by Mobile Number or Booking ID"
       value={search}
       onChange={(e) => setSearch(e.target.value)}
       className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl text-white"
       />
        </div>

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
              <th className="p-3">Bus</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Age</th>
              <th className="p-3">Booking Time</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-b border-zinc-800">
                <td className="p-3">{booking.bookingId}</td>
                <td className="p-3">{booking.name}</td>
                <td className="p-3">{booking.selectedSeat}</td>
                <td className="p-3">
               {booking.busName || "Shiv Shakti"}
              </td>
                <td className="p-3">{booking.mobile}</td>
                <td className="p-3">{booking.gender}</td>
                <td className="p-3">{booking.age}</td>

                <td className="p-3">
               {booking.createdAt?.seconds
                ? new Date(booking.createdAt.seconds * 1000).toLocaleString()
                : "N/A"}
               </td>

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