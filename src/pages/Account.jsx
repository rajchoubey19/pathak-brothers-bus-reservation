export default function Account() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">

        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>

          <h1 className="text-4xl font-bold text-yellow-400 mb-3">
            Customer Account
          </h1>

          <p className="text-zinc-400 mb-8">
            Login with your mobile number to view bookings, download tickets and manage your trips.
          </p>
        </div>

        <input
          type="tel"
          placeholder="Enter Mobile Number"
          disabled
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl outline-none mb-4 text-zinc-500"
        />

        <button
          disabled
          className="w-full bg-yellow-400/60 text-black py-3 rounded-xl font-bold mb-4 cursor-not-allowed"
        >
          Send OTP
        </button>

        <div className="bg-black border border-zinc-700 rounded-2xl p-4 mt-6">
          <h2 className="text-yellow-400 font-bold mb-2">
            Coming Soon
          </h2>

          <p className="text-zinc-400 text-sm">
            Customer OTP login will be added in the next phase. For now, you can search your bookings from the My Bookings section.
          </p>
        </div>

      </div>
    </div>
  );
}