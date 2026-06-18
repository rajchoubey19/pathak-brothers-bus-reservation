import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [routeStats, setRouteStats] = useState([]);
  const [search, setSearch] = useState("");

  const [busName, setBusName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fare, setFare] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [editRouteId, setEditRouteId] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLogin");

    if (isAdmin !== "true") {
      navigate("/admin-login");
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    const bookingSnapshot = await getDocs(collection(db, "bookings"));

    const bookingData = bookingSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setBookings(bookingData);

    const routeSnapshot = await getDocs(collection(db, "routes"));

    const routeData = routeSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setRoutes(routeData);

    const stats = {};

    bookingData.forEach((booking) => {
      const route = `${booking.fromCity} → ${booking.toCity}`;

      if (!stats[route]) {
        stats[route] = {
          route,
          seats: 0,
          revenue: 0,
        };
      }

      stats[route].seats += booking.selectedSeats?.length || 1;
      stats[route].revenue += Number(booking.totalFare) || 0;
    });

    setRouteStats(Object.values(stats));
  };

  const totalBookings = bookings.length;

  const bookedSeats = bookings.reduce((total, booking) => {
    return total + (booking.selectedSeats?.length || 1);
  }, 0);

  const totalSeats = 45;
  const availableSeats = totalSeats - bookedSeats;

  const todaysBookings = bookings.filter((booking) => {
    if (!booking.createdAt?.seconds) return false;

    const bookingDate = new Date(booking.createdAt.seconds * 1000);
    const today = new Date();

    return bookingDate.toDateString() === today.toDateString();
  }).length;

  const totalRevenue = bookings.reduce((total, booking) => {
    return total + (Number(booking.totalFare) || 0);
  }, 0);

  const todaysRevenue = bookings
    .filter((booking) => {
      if (!booking.createdAt?.seconds) return false;

      const bookingDate = new Date(booking.createdAt.seconds * 1000);
      const today = new Date();

      return bookingDate.toDateString() === today.toDateString();
    })
    .reduce((total, booking) => {
      return total + (Number(booking.totalFare) || 0);
    }, 0);

  const filteredBookings = bookings.filter((booking) => {
    const passengerNames =
      booking.passengers
        ?.map((passenger) => passenger.name?.toLowerCase())
        .join(" ") || "";

    return (
      booking.mobile?.includes(search) ||
      booking.bookingId?.toLowerCase().includes(search.toLowerCase()) ||
      passengerNames.includes(search.toLowerCase())
    );
  });

  const addRoute = async () => {
    if (!busName || !from || !to || !fare || !time || !type) {
      alert("Please fill all fields");
      return;
    }

    if (editRouteId) {
      await updateDoc(doc(db, "routes", editRouteId), {
        busName,
        from,
        to,
        fare,
        time,
        type,
      });

      setRoutes(
        routes.map((route) =>
          route.id === editRouteId
            ? { ...route, busName, from, to, fare, time, type }
            : route
        )
      );

      alert("Route Updated Successfully");
      setEditRouteId(null);
    } else {
      const docRef = await addDoc(collection(db, "routes"), {
        busName,
        from,
        to,
        fare,
        time,
        type,
      });

      setRoutes([
        ...routes,
        {
          id: docRef.id,
          busName,
          from,
          to,
          fare,
          time,
          type,
        },
      ]);

      alert("Route Added Successfully");
    }

    setBusName("");
    setFrom("");
    setTo("");
    setFare("");
    setTime("");
    setType("");
  };

  const editRoute = (route) => {
    setEditRouteId(route.id);
    setBusName(route.busName || "");
    setFrom(route.from || "");
    setTo(route.to || "");
    setFare(route.fare || "");
    setTime(route.time || "");
    setType(route.type || "");
  };

  const deleteRoute = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "routes", id));

    setRoutes(routes.filter((route) => route.id !== id));
  };

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
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6">
        Admin Panel
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => {
            localStorage.removeItem("adminLogin");
            navigate("/admin-login");
          }}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-bold"
        >
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-700 rounded-3xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          ➕ {editRouteId ? "Update Route" : "Add New Route"}
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
          {editRouteId ? "Update Route" : "Add Route"}
        </button>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by Mobile, Booking ID or Passenger Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl text-white"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Total Bookings</h2>
          <p className="text-3xl font-bold text-yellow-400">{totalBookings}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Booked Seats</h2>
          <p className="text-3xl font-bold text-red-400">{bookedSeats}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Available Seats</h2>
          <p className="text-3xl font-bold text-green-400">{availableSeats}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Today's Bookings</h2>
          <p className="text-3xl font-bold text-yellow-400">{todaysBookings}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-400">₹{totalRevenue}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-center">
          <h2 className="text-zinc-400">Today's Revenue</h2>
          <p className="text-3xl font-bold text-yellow-400">₹{todaysRevenue}</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          Route Statistics
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {routeStats.map((route, index) => (
            <div
              key={index}
              className="bg-black border border-zinc-700 rounded-2xl p-5"
            >
              <h3 className="text-lg font-bold text-yellow-400">
                {route.route}
              </h3>

              <p className="mt-3">💺 Booked Seats: {route.seats}</p>

              <p className="mt-2 text-green-400 font-bold">
                💰 Revenue: ₹{route.revenue}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
          Available Routes ({routes.length})
        </h2>

        <div className="space-y-3">
          {routes.map((route) => (
            <div
              key={route.id}
              className="flex justify-between items-center bg-black border border-zinc-700 rounded-xl p-4"
            >
              <div>
                <p className="text-yellow-400 font-bold">{route.busName}</p>
                <p className="text-zinc-300">
                  🚌 {route.from} → {route.to}
                </p>
                <p className="text-zinc-400 text-sm">
                  {route.time} • ₹{route.fare} • {route.type}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editRoute(route)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-bold"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteRoute(route.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-zinc-900 border border-zinc-700 rounded-3xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          Recent Bookings
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-yellow-400 border-b border-zinc-700">
              <th className="p-3">Booking ID</th>
              <th className="p-3">Passengers</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Bus</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Route</th>
              <th className="p-3">Fare</th>
              <th className="p-3">Booking Time</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-b border-zinc-800">
                <td className="p-3">{booking.bookingId}</td>

                <td className="p-3">
                  {booking.passengers?.length > 0
                    ? booking.passengers.map((passenger, index) => (
                        <div key={index}>
                          {passenger.name} ({passenger.age}, {passenger.gender})
                        </div>
                      ))
                    : booking.name || "N/A"}
                </td>

                <td className="p-3">{booking.selectedSeat}</td>

                <td className="p-3">{booking.busName || "Shiv Shakti"}</td>

                <td className="p-3">{booking.mobile}</td>

                <td className="p-3">
                  {booking.fromCity} → {booking.toCity}
                </td>

                <td className="p-3 text-green-400 font-bold">
                  ₹{booking.totalFare || 0}
                </td>

                <td className="p-3">
                  {booking.createdAt?.seconds
                    ? new Date(
                        booking.createdAt.seconds * 1000
                      ).toLocaleString()
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