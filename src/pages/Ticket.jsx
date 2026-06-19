import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

export default function Ticket() {
  const { state } = useLocation();

  const downloadTicket = () => {
  const doc = new jsPDF();

  // Outer border
  doc.setDrawColor(255, 193, 7);
  doc.setLineWidth(1);
  doc.roundedRect(15, 15, 180, 250, 5, 5);

  // Header
  doc.setFillColor(255, 193, 7);
  doc.roundedRect(15, 15, 180, 35, 5, 5, "F");

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("PATHAK BROTHERS", 105, 32, { align: "center" });

  doc.setFontSize(12);
  doc.text("Bus Reservation Ticket", 105, 43, { align: "center" });

  // Status
  doc.setTextColor(0, 128, 0);
  doc.setFontSize(16);
  doc.text("BOOKING CONFIRMED", 105, 65, { align: "center" });

  // Route box
  doc.setDrawColor(220, 220, 220);
  doc.roundedRect(25, 78, 160, 35, 4, 4);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.text("ROUTE", 30, 88);

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
   doc.text(
  `${state?.fromCity || "N/A"} - ${state?.toCity || "N/A"}`,
  105,
  103,
  { align: "center" }
   );

  // Trip details
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Bus Name: ${state?.busName || "Shiv Shakti"}`, 30, 130);
  doc.text(`Seat Number: ${state?.selectedSeat || "N/A"}`, 30, 145);
  doc.text(`Journey Date: ${state?.journeyDate || "N/A"}`, 30, 160);
  doc.text(`Fare Per Seat: Rs. ${state?.fare || 0}`, 30, 175);

doc.text(
  `Total Fare: Rs. ${state?.totalFare || 0}`,
  30,
  190
);

  // Passenger details
  doc.setFont("helvetica", "bold");
  doc.text("Passenger Details", 30, 210);

  doc.setFont("helvetica", "normal");

let y = 225;

state?.passengers?.forEach((passenger, index) => {
  doc.text(
    `Passenger ${index + 1} (Seat ${passenger.seat})`,
    30,
    y
  );

  doc.text(
    `${passenger.name} | Age: ${passenger.age} | ${passenger.gender}`,
    40,
    y + 10
  );

  y += 20;
});

doc.text(`Mobile: ${state?.mobile || "N/A"}`, 30, y + 10);
  // Booking ID
  doc.setFont("helvetica", "bold");
  doc.text(
  `Booking ID: ${state?.bookingId || "N/A"}`,
  30,
  y + 25
);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for choosing Pathak Brothers.", 105, 272, {
    align: "center",
  });

  doc.save("pathak-brothers-ticket.pdf");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-6">

      <div id="ticket-card" className="w-full max-w-2xl bg-zinc-900 border border-yellow-400 rounded-[32px] overflow-hidden shadow-2xl">
        <div className="bg-yellow-400 text-black p-6 text-center">
          <h1 className="text-4xl font-extrabold">
            Pathak Brothers
          </h1>
          <p className="font-semibold mt-2">
            Booking Confirmed ✅
          </p>
        </div>

        <div className="p-8">

          <div className="bg-black border border-zinc-700 rounded-2xl p-5 mb-6">
            <p className="text-zinc-400 text-sm">Route</p>
            <h2 className="text-3xl font-bold text-yellow-400 mt-1">
              {state?.fromCity || "N/A"} → {state?.toCity || "N/A"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-black border border-zinc-700 rounded-2xl p-4">
              <p className="text-zinc-400 text-sm">Bus</p>
              <p className="text-xl font-bold">{state?.busName || "Shiv Shakti"}</p>
            </div>

            <div className="bg-black border border-zinc-700 rounded-2xl p-4">
              <p className="text-zinc-400 text-sm">Seat</p>
              <p className="text-xl font-bold text-yellow-400">
                {state?.selectedSeat || "N/A"}
              </p>
            </div>

            <div className="bg-black border border-zinc-700 rounded-2xl p-4">
              <p className="text-zinc-400 text-sm">Journey Date</p>
              <p className="text-xl font-bold">{state?.journeyDate || "N/A"}</p>
            </div>
          </div>

          <div className="bg-black border border-zinc-700 rounded-2xl p-5 mb-6">
  <h3 className="text-2xl font-bold text-yellow-400 mb-4">
    Passenger Details
  </h3>

  <div className="mb-4">
    <p><span className="text-zinc-400">Mobile:</span> {state?.mobile || "N/A"}</p>
    <p><span className="text-zinc-400">Email:</span> {state?.email || "N/A"}</p>
    <p><span className="text-zinc-400">Booking ID:</span> {state?.bookingId || "N/A"}</p>
  </div>

  <div className="space-y-3">
    {state?.passengers?.map((passenger, index) => (
      <div
        key={index}
        className="border border-zinc-700 rounded-xl p-3"
      >
        <p className="font-bold text-yellow-400">
          Passenger {index + 1} - Seat {passenger.seat}
        </p>

        <p>Name: {passenger.name}</p>
        <p>Age: {passenger.age}</p>
        <p>Gender: {passenger.gender}</p>
      </div>
    ))}
  </div>
</div>

          <div className="bg-green-500/10 border border-green-500 rounded-2xl p-4 text-center mb-6">
            <p className="text-green-400 font-bold text-xl">
              Status: Confirmed ✅
            </p>
          </div>

          <div className="flex flex-col items-center mb-2">
          <QRCodeCanvas
          value={JSON.stringify({
          bookingId: state?.bookingId,
          passenger: state?.name,
          seat: state?.selectedSeat,
          bus: state?.busName,
         })}
         size={70}
        />

        <p className="text-zinc-400 mt-3 text-sm">
         Scan to verify booking
         </p>
         </div>

         <button
          onClick={() => window.print()}
          className="w-full bg-green-500 text-white py-3 rounded-xl font-bold mb-4" 
          >
          Print Ticket
          </button>

          <button
            onClick={downloadTicket}
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Download Ticket PDF
          </button>

        </div>
      </div>
    </div>
  );
}