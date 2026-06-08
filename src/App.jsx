import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Buses from "./pages/Buses";
import Otp from "./pages/Otp";
import Passenger from "./pages/Passenger.jsx";
import Ticket from "./pages/Ticket.jsx";
import Dashboard from "./pages/Dashboard.jsx";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;