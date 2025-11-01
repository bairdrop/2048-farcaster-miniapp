'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">2048 Farcaster</h1>
            <p className="text-gray-600 mb-6">The classic puzzle game</p>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-8">
              <p className="text-xl font-bold">Game Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
