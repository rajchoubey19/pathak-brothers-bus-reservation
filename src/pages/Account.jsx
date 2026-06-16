export default function Account() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-8 text-center shadow-2xl">
        <div className="text-6xl mb-4">👤</div>

        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Account
        </h1>

        <p className="text-zinc-400 mb-6">
          Customer login and signup feature will be available soon.
        </p>

        <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold mb-4">
          Login Coming Soon
        </button>

        <button className="w-full border border-yellow-400 text-yellow-400 py-3 rounded-xl font-bold">
          Signup Coming Soon
        </button>
      </div>
    </div>
  );
}