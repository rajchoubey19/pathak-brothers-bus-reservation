import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Buses from "./pages/Buses";
import Otp from "./pages/Otp";
import Passenger from "./pages/Passenger.jsx";
import Ticket from "./pages/Ticket.jsx";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;