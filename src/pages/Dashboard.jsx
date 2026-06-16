import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [totalRoutes, setTotalRoutes] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [busName, setBusName] = useState("");
const [from, setFrom] = useState("");
const [to, setTo] = useState("");
const [fare, setFare] = useState("");
const [time, setTime] = useState("");
const [type, setType] = useState("");

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

  const routesSnapshot = await getDocs(collection(db, "routes"));
  setTotalRoutes(routesSnapshot.size);

  const routesData = routesSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

setRoutes(routesData);
};

    fetchBookings();
  }, []);

  const totalBookings = bookings.length;
  const bookedSeats = bookings.length;
  const totalSeats = 45;
  const availableSeats = totalSeats - bookedSeats;
  const todaysBookings = bookings.filter((booking) => {
  if (!booking.createdAt?.seconds) return false;

  const bookingDate = new Date(booking.createdAt.seconds * 1000);
  const today = new Date();

  return bookingDate.toDateString() === today.toDateString();
}).length;

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

 const addRoute = async () => {
  if (!busName || !from || !to || !fare || !time || !type) {
    alert("Please fill all fields");
    return;
  }

  await addDoc(collection(db, "routes"), {
    busName,
    from,
    to,
    fare,
    time,
    type,
  });

  alert("Route Added Successfully");

  setBusName("");
  setFrom("");
  setTo("");
  setFare("");
  setTime("");
  setType("");
};

  const deleteRoute = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this route?"
  );

  if (!confirmDelete) return;

  await deleteDoc(doc(db, "routes", id));

  setRoutes(routes.filter((route) => route.id !== id));

  setTotalRoutes((prev) => prev - 1);
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

<div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 mb-8">
  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
    ➕ Add New Route
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Bus Name"
      value={busName}
      onChange={(e) => setBusName(e.target.value)}
      className="bg-black border border-zinc-700 p-3 rounded-xl"
    />

    <input
      type="text"
      placeholder="From"
      value={from}
      onChange={(e) => setFrom(e.target.value)}
      className="bg-black border border-zinc-700 p-3 rounded-xl"
    />

    <input
      type="text"
      placeholder="To"
      value={to}
      onChange={(e) => setTo(e.target.value)}
      className="bg-black border border-zinc-700 p-3 rounded-xl"
    />

    <input
      type="text"
      placeholder="Fare"
      value={fare}
      onChange={(e) => setFare(e.target.value)}
      className="bg-black border border-zinc-700 p-3 rounded-xl"
    />

    <input
      type="text"
      placeholder="Time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      className="bg-black border border-zinc-700 p-3 rounded-xl"
    />

    <input
      type="text"
      placeholder="Type"
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="bg-black border border-zinc-700 p-3 rounded-xl"
    />

  </div>

  <button
    onClick={addRoute}
    className="mt-4 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
  >
    Add Route
  </button>
</div>

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

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center">
       <h2 className="text-zinc-400 text-lg">
        Today's Bookings
        </h2>

        <p className="text-4xl font-bold text-yellow-400 mt-2">
        {todaysBookings}
        </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-8">
  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
    Recent Bookings
  </h2>

  <div className="space-y-3">
    {bookings.slice(0, 5).map((booking, index) => (
      <div
        key={index}
        className="flex justify-between items-center bg-black border border-zinc-700 rounded-xl p-3"
      >
        <div>
          <p className="font-bold">
            {booking.name}
          </p>

          <p className="text-sm text-zinc-400">
            Seat {booking.selectedSeat}
          </p>
        </div>

        <div className="text-yellow-400 font-bold">
          {booking.busName}
        </div>
      </div>
    ))}
  </div>
</div>
        

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
  <h2 className="text-zinc-400">Total Routes</h2>

  <p className="text-3xl font-bold text-purple-400">
    {totalRoutes}
  </p>

    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-8">
  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
    Available Routes
  </h2>

  {routes.map((route) => (
  <div
    key={route.id}
    className="flex justify-between items-center bg-black border border-zinc-700 rounded-xl p-3"
  >
    <p className="text-zinc-300">
      🚌 {route.from} → {route.to}
    </p>

    <button
      onClick={() => deleteRoute(route.id)}
      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
    >
      Delete
    </button>
  </div>
))}
</div>

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