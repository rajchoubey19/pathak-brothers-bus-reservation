import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const navClass = ({ isActive }) =>
    `flex flex-col items-center text-xs font-semibold ${
      isActive ? "text-yellow-400" : "text-white"
    }`;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 text-white border-t border-zinc-700 md:hidden z-50">
      <div className="grid grid-cols-4 text-center py-3">

        <NavLink to="/" className={navClass}>
          <span className="text-xl">🏠</span>
          Home
        </NavLink>

        <NavLink to="/my-bookings" className={navClass}>
          <span className="text-xl">🎫</span>
          My Bookings
        </NavLink>

        <NavLink to="/contact" className={navClass}>
          <span className="text-xl">📞</span>
          Contact
        </NavLink>

        <NavLink to="/login" className={navClass}>
          <span className="text-xl">👤</span>
          Account
        </NavLink>

      </div>
    </div>
  );
}