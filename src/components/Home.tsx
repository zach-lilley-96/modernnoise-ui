import React from 'react';
import { Link } from 'react-router-dom';
import rankingImg from '../assets/images/ranking.png';
import tierListImg from '../assets/images/tierList.png';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-center mt-10">
      <h2 className="text-6xl font-bold mb-4">Welcome to ModernNoise</h2>
      <p className="text-3xl text-gray-600">
        Discover and rank your favorite artists and albums.
      </p>

      {/* Images section */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <h2 className="text-3xl font-bold mt-11">Rank the albums of your favorite artists</h2>
          <img
            src={rankingImg}
            alt="Ranking preview"
            className="h-[45vh] w-full object-contain p-4"
          />
        </div>

        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <h2 className="text-3xl font-bold mt-11">And view them as a tier list</h2>
          <img
            src={tierListImg}
            alt="Tier list preview"
            className="h-[45vh] w-full object-contain p-4"
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center px-4 mt-7">
        <Link
          to="/search"
          className="w-full max-w-md rounded-xl bg-blue-600 px-6 py-4 text-2xl font-bold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Start your search here
        </Link>
      </div>
    </div>
  );
};

export default Home;
