import React from 'react';
import { Link } from 'react-router-dom';
import rankingImg from '../assets/images/ranking.png';
import tierListImg from '../assets/images/tierList.png';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-20 text-center">
        <header className="max-w-3xl mx-auto mb-16">
          <h2 className="text-7xl font-black text-gray-900 mb-6 tracking-tight leading-none">
            Welcome to <span className="text-indigo-600">ModernNoise</span>
          </h2>
          <p className="text-2xl text-gray-600 leading-relaxed">
            The ultimate platform to discover, rank, and share your favorite artists and albums with friends.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/search"
              className="px-8 py-4 bg-indigo-600 text-white text-xl font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/saved-friends"
              className="px-8 py-4 bg-white text-gray-700 text-xl font-bold rounded-2xl border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Find Friends
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden transition-all hover:shadow-2xl hover:border-indigo-100">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-50 rounded-full transition-transform group-hover:scale-150"></div>
            <div className="relative">
              <h3 className="text-3xl font-black text-gray-800 mb-6">Rank Everything</h3>
              <p className="text-gray-500 mb-8">Score albums from your favorite artists and keep track of your musical journey.</p>
              <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 overflow-hidden">
                <img
                  src={rankingImg}
                  alt="Ranking preview"
                  className="h-[40vh] w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden transition-all hover:shadow-2xl hover:border-pink-100">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-pink-50 rounded-full transition-transform group-hover:scale-150"></div>
            <div className="relative">
              <h3 className="text-3xl font-black text-gray-800 mb-6">Visual Tier Lists</h3>
              <p className="text-gray-500 mb-8">Automatically generate beautiful tier lists from your ratings to share with the world.</p>
              <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 overflow-hidden">
                <img
                  src={tierListImg}
                  alt="Tier list preview"
                  className="h-[40vh] w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
