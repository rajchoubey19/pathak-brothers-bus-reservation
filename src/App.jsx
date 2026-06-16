import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Buses from "./pages/Buses";
import Otp from "./pages/Otp";
import Passenger from "./pages/Passenger.jsx";
import Ticket from "./pages/Ticket.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import BottomNav from "./components/BottomNav.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Account from "./pages/Account.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Account />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;