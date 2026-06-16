export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6">
          Contact Pathak Brothers
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          For booking support, route information, cancellation help or travel queries, contact us anytime.
        </p>

        <div className="space-y-5 text-lg">
          <div className="bg-black border border-zinc-700 rounded-2xl p-5">
            <p className="text-zinc-400">Owner Name</p>
            <p className="text-yellow-400 font-bold">Pathak Brothers</p>
          </div>

          <div className="bg-black border border-zinc-700 rounded-2xl p-5">
            <p className="text-zinc-400">Phone Number</p>
            <p className="font-bold">+91 98765 43210</p>
          </div>

          <div className="bg-black border border-zinc-700 rounded-2xl p-5">
            <p className="text-zinc-400">WhatsApp Number</p>
            <p className="font-bold">+91 98765 43210</p>
          </div>

          <div className="bg-black border border-zinc-700 rounded-2xl p-5">
            <p className="text-zinc-400">Email</p>
            <p className="font-bold break-words">
               pathakbrothers@gmail.com
            </p>
          </div>

          <div className="bg-black border border-zinc-700 rounded-2xl p-5">
            <p className="text-zinc-400">Address</p>
            <p className="font-bold">Indore, Madhya Pradesh</p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

            <a
              href="tel:+919876543210"
                 className="bg-green-500 text-white py-4 rounded-2xl text-center font-bold hover:scale-105 transition"
               >
               📞 Call Now
              </a>

             <a
               href="https://wa.me/919876543210"
                 target="_blank"
              rel="noreferrer"
                className="bg-yellow-400 text-black py-4 rounded-2xl text-center font-bold hover:scale-105 transition"
              >
                 💬 WhatsApp
           </a>

          </div>
          </div>
        </div>
      </div>
    </div>
  );
}