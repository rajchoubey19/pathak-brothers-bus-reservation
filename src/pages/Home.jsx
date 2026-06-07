import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-black via-zinc-900 to-black">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-zinc-800 backdrop-blur-md bg-black/40 sticky top-0 z-50">

        <h1 className="text-3xl font-bold text-yellow-400">
          Pathak Brothers
        </h1>

        <ul className="hidden md:flex gap-8 text-lg">
          <li className="hover:text-yellow-400 cursor-pointer">Home</li>
          <li className="hover:text-yellow-400 cursor-pointer">Buses</li>
          <li className="hover:text-yellow-400 cursor-pointer">Booking</li>
          <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
        </ul>

      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-5 min-h-[80vh]">

      <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>

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



         
        </div>
        {/* Search Box */}

       <div className="mb-24"></div>
<div className="mt-14 bg-zinc-900/70 backdrop-blur-md border border-zinc-700 p-6 rounded-3xl w-full max-w-5xl shadow-2xl">

  <div className="grid md:grid-cols-4 gap-5">

    <input
      type="text"
      placeholder="From"
      className="bg-black border border-zinc-700 p-4 rounded-xl outline-none"
    />

    <input
      type="text"
      placeholder="To"
      className="bg-black border border-zinc-700 p-4 rounded-xl outline-none"
    />

    <input
      type="date"
      className="bg-black border border-zinc-700 p-4 rounded-xl outline-none"
    />

      <Link
     to="/buses"
     className="bg-yellow-400 text-black rounded-xl font-bold hover:scale-105 transition duration-300 flex items-center justify-center"
      >
    Search Buses
   </Link>

  </div>

</div>

  </section>
  


<footer className="border-t border-zinc-800 py-12 px-8 text-center mt-20">
  <h3 className="text-2xl font-bold text-yellow-400">
    Pathak Brothers
  </h3>

  <p className="text-zinc-400 mt-3">
    Safe • Comfortable • Affordable Travel
  </p>

  <p className="text-zinc-500 mt-2">
    📞 +91 98765 43210
  </p>

  <p className="text-zinc-500">
    📧 pathakbrothers@gmail.com
  </p>

  <p className="text-zinc-600 mt-6 text-sm">
    © 2026 Pathak Brothers. All Rights Reserved.
  </p>

</footer>

  </div>
  );
}