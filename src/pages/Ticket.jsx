import { formatDate } from "../utils/dateFormat";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

export default function Ticket() {
  const { state } = useLocation();

 const downloadTicket = () => {
  const doc = new jsPDF();

  const passenger = state?.passengers?.[0];

  doc.setDrawColor(255, 193, 7);
  doc.setLineWidth(1);
  doc.roundedRect(15, 15, 180, 250, 5, 5);

  doc.setFillColor(255, 193, 7);
  doc.roundedRect(15, 15, 180, 30, 5, 5, "F");

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("PATHAK BROTHERS", 105, 28, { align: "center" });

  doc.setFontSize(11);
  doc.text("Bus Reservation Ticket", 105, 38, { align: "center" });

  doc.setTextColor(0, 128, 0);
  doc.setFontSize(15);
  doc.text("BOOKING CONFIRMED", 105, 62, { align: "center" });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(
    `${state?.fromCity || "N/A"} to ${state?.toCity || "N/A"}`,
    105,
    80,
    { align: "center" }
  );

  // Trip Details Box
  doc.setDrawColor(255, 193, 7);
  doc.roundedRect(20, 95, 78, 85, 4, 4);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Trip Details", 59, 108, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Bus : ${state?.busName || "N/A"}`, 27, 125);
  doc.text(`Seat : ${state?.selectedSeat || "N/A"}`, 27, 138);
  doc.text(`Date : ${formatDate(state?.journeyDate)}`, 27, 151);
  doc.text(`Fare : Rs. ${state?.fare || 0}`, 27, 164);
  doc.text(`Total : Rs. ${state?.totalFare || 0}`, 27, 177);

  // Passenger Details Box
  doc.roundedRect(112, 95, 78, 85, 4, 4);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Passenger Details", 151, 108, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Name : ${passenger?.name || "N/A"}`, 119, 125);
  doc.text(`Age : ${passenger?.age || "N/A"}`, 119, 138);
  doc.text(`Gender : ${passenger?.gender || "N/A"}`, 119, 151);
  doc.text(`Mobile : ${state?.mobile || "N/A"}`, 119, 164);
  doc.text(`Booking : ${state?.bookingId || "N/A"}`, 119, 177);

  doc.setDrawColor(220, 220, 220);
  doc.line(25, 215, 185, 215);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for choosing", 105, 232, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.text("Pathak Brothers", 105, 242, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.text("Have a Safe Journey", 105, 252, { align: "center" });

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "pathak-brothers-ticket.pdf";
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(pdfUrl);
  }, 1000);
};

  return (
<div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-6 pb-28">
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
  <p className="text-xl font-bold">
    {formatDate(state?.journeyDate) || "N/A"}
  </p>
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