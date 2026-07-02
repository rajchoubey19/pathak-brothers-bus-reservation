import { formatDate } from "../utils/dateFormat";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Home() {
  const [from, setFrom] = useState("");
const [to, setTo] = useState("");
const [date, setDate] = useState("");

const navigate = useNavigate();

const handleSearch = () => {
  if (!from || !to || !date) {
    alert("Please fill From, To and Journey Date");
    return;
  }

  if (from.toLowerCase() === to.toLowerCase()) {
  alert("From and To cannot be the same");
  return;
}

  navigate("/buses", {
    state: {
      from,
      to,
      date,
    },
  });
};
  return (
<div className="min-h-screen w-full overflow-x-hidden text-white bg-gradient-to-br from-black via-zinc-900 to-black pb-24">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-zinc-800 backdrop-blur-md bg-black/40 sticky top-0 z-50">

        <h1 className="text-3xl font-bold text-yellow-400">
          Pathak Brothers
        </h1>

        <ul className="hidden md:flex gap-8 text-lg">
  <li>
    <Link to="/" className="hover:text-yellow-400">
      Home
    </Link>
  </li>

  <li>
    <Link to="/my-bookings" className="hover:text-yellow-400">
      My Bookings
    </Link>
  </li>

  <li>
    <Link to="/contact" className="hover:text-yellow-400">
      Contact
    </Link>
  </li>

  <li>
    <Link to="/login" className="hover:text-yellow-400">
      Account
    </Link>
  </li>
</ul>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-5 min-h-fit pb-16">

<div className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <p className="text-yellow-400 text-lg mb-4 mt-16">
          Safe • Comfortable • Affordable
        </p>

        <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Travel With <br />
          Pathak Brothers
        </h2>

        <p className="mt-6 text-zinc-400 max-w-2xl text-lg">
          Book buses easily with live seat availability,
          fast booking and premium travel experience.
        </p>

        <div className="flex gap-5 mt-10">

          <div className="overflow-hidden whitespace-nowrap mt-2 mb-3">
         <div className="inline-block animate-marquee text-yellow-400 font-bold text-2xl">
        Welcome To Pathak Brothers
       </div>
       </div>
         
        </div>
        {/* Search Box */}

<div className="mt-14 bg-zinc-900/70 backdrop-blur-md border border-zinc-700 p-5 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden">
<div className="grid grid-cols-1 md:grid-cols-4 gap-5">
   <input
    type="text"
    placeholder="From"
    value={from}
    onChange={(e) => setFrom(e.target.value)}
    className="bg-black border border-zinc-700 p-4 rounded-xl outline-none"
    />
    <input
     type="text"
     placeholder="To"
     value={to}
     onChange={(e) => setTo(e.target.value)}
     className="bg-black border border-zinc-700 p-4 rounded-xl outline-none"
     />

    <input
     type="date"
     value={date}
     onChange={(e) => setDate(e.target.value)}
     className="bg-black border border-zinc-700 p-4 rounded-xl outline-none"
    />

      <button
  onClick={handleSearch}
  className="bg-yellow-400 text-black rounded-xl font-bold hover:scale-105 transition duration-300 flex items-center justify-center"
>
  Search Buses
</button>

  </div>

</div>

<div className="mt-6 bg-zinc-900 border border-zinc-700 rounded-3xl p-5 w-full max-w-5xl">
  <h3 className="text-yellow-400 font-bold text-xl mb-3">
    Available Routes
  </h3>

  <div className="grid md:grid-cols-3 gap-3 text-zinc-300">
    <p>📍 Indore → Bhopal</p>
    <p>📍 Indore → Ujjain</p>
    <p>📍 Indore → Jabalpur</p>
  </div>

  <p className="text-zinc-500 mt-4 text-sm">
    Currently only a few routes are available for testing purposes.
    More routes will be added in future updates.
  </p>
</div>

  </section>

  <section className="px-8 py-16">
  <h2 className="text-4xl font-bold text-center text-yellow-400 mb-10">
    Why Choose Pathak Brothers?
  </h2>

  <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 text-center">
      <div className="text-4xl mb-4">🛡️</div>
      <h3 className="text-xl font-bold mb-2">Safe Journey</h3>
      <p className="text-zinc-400 text-sm">
        Travel safely with trusted and reliable bus service.
      </p>
    </div>

    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 text-center">
      <div className="text-4xl mb-4">⏰</div>
      <h3 className="text-xl font-bold mb-2">On Time Departure</h3>
      <p className="text-zinc-400 text-sm">
        We value your time with punctual departures.
      </p>
    </div>

    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 text-center">
      <div className="text-4xl mb-4">💺</div>
      <h3 className="text-xl font-bold mb-2">Comfortable Seats</h3>
      <p className="text-zinc-400 text-sm">
        Enjoy a smooth journey with comfortable seating.
      </p>
    </div>

    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 text-center">
      <div className="text-4xl mb-4">📞</div>
      <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
      <p className="text-zinc-400 text-sm">
        Get help anytime for booking and travel support.
      </p>
    </div>
  </div>
</section>

<section className="px-8 py-16">
  <div className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-700 rounded-3xl p-8 md:p-12">

    <h2 className="text-4xl font-bold text-yellow-400 text-center mb-6">
      About Pathak Brothers
    </h2>

    <p className="text-zinc-300 text-lg leading-8 text-center">
      Pathak Brothers is committed to providing safe, comfortable and affordable
      travel experiences for passengers. Our mission is to make bus travel simple,
      reliable and convenient through modern online booking, live seat selection
      and customer-friendly service.
    </p>

    <p className="text-zinc-400 text-center mt-6">
      We believe every journey should be safe, comfortable and memorable.
    </p>

  </div>
</section>
  


<footer
  id="contact"
className="border-t border-zinc-800 pt-16 pb-28 px-8 mt-20 bg-black">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

    {/* Company */}
    <div>
      <h3 className="text-3xl font-bold text-yellow-400 mb-4">
        Pathak Brothers
      </h3>

      <p className="text-zinc-400">
        Safe, Comfortable and Affordable Travel for every passenger.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        Quick Links
      </h3>

      <ul className="space-y-2 text-zinc-400">
        <li>🏠 Home</li>
        <li>🎫 My Bookings</li>
        <li>📞 Contact</li>
        <li>👤 Account</li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        Contact Us
      </h3>

      <p className="text-zinc-400 mb-2">
        📞 +91 98765 43210
      </p>

      <p className="text-zinc-400 mb-2 break-all">
        📧 pathakbrothers@gmail.com
      </p>

      <p className="text-zinc-400 mb-4">
        📍 Indore, Madhya Pradesh
      </p>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold hover:scale-105 transition"
      >
        💬 WhatsApp Us
      </a>
    </div>

  </div>

  <div className="border-t border-zinc-800 mt-10 pt-6 text-center">
    <p className="text-zinc-500 text-sm">
      © 2026 Pathak Brothers. All Rights Reserved.
    </p>
  </div>
</footer>

  </div>
  );
}