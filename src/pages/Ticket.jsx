import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

export default function Ticket() {
const { state } = useLocation();
const downloadTicket = () => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Pathak Brothers", 20, 20);

  doc.setFontSize(16);
  doc.text("Booking Confirmed", 20, 35);

  doc.setFontSize(12);
  doc.text(`Bus: Shiv Shakti`, 20, 55);
  doc.text(`Seat: ${state?.selectedSeat || "N/A"}`, 20, 65);
  doc.text(`Passenger: ${state?.name || "N/A"}`, 20, 75);
  doc.text(`Age: ${state?.age || "N/A"}`, 20, 85);
  doc.text(`Gender: ${state?.gender || "N/A"}`, 20, 95);
  doc.text(`Mobile: ${state?.mobile || "N/A"}`, 20, 105);
  doc.text(`Booking ID: ${state?.bookingId || "N/A"}`, 20, 115);
  doc.text(`Status: Confirmed`, 20, 125);

  doc.save("pathak-brothers-ticket.pdf");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-zinc-900 border border-yellow-400 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
          Booking Confirmed 🎉
        </h1>

        <div className="space-y-4 text-lg">

          <p>
            <span className="text-zinc-400">Bus:</span>{" "}
           {state?.busName || "Shiv Shakti"}
          </p>

          <p>
         <span className="text-zinc-400">Seat:</span>{" "}
         {state?.selectedSeat || "N/A"}
          </p>

          <p>
            <span className="text-zinc-400">Passenger:</span>{" "}
            {state?.name || "N/A"}
          </p>

          <p>
            <span className="text-zinc-400">Age:</span>{" "}
            {state?.age || "N/A"}
          </p>

          <p>
            <span className="text-zinc-400">Gender:</span>{" "}
            {state?.gender || "N/A"}
          </p>

          <p>
            <span className="text-zinc-400">Mobile:</span>{" "}
            {state?.mobile || "N/A"}
          </p>

          <p>
            <span className="text-zinc-400">Email:</span>{" "}
            {state?.email || "N/A"}
          </p>

          <p>
         <span className="text-zinc-400">Booking ID:</span>{" "}
        {state?.bookingId || "N/A"}
        </p>

          <p className="text-green-400 font-bold">
            Status: Confirmed ✅
          </p>

          <button
        onClick={downloadTicket}
      className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
    >
    Download Ticket PDF
    </button>

        </div>

      </div>

    </div>
  );
}