export default function SeatBooking() {
  return (
    <section className="px-8 pb-24">
      <h3 className="text-4xl font-bold text-center mb-10">
        Seat Booking
      </h3>

      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <div className="grid grid-cols-4 gap-4">

          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="bg-green-500 text-black font-bold h-14 flex items-center justify-center rounded-xl"
            >
              {i + 1}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}