import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../helpers/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <Link to="/" className="text-xl font-bold mr-4">ModernNoise</Link>
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/search" className="hover:text-gray-300">Search</Link>
          <Link to="/saves" className="hover:text-gray-300">My Ratings</Link>
          <Link to="/saved-friends" className="hover:text-gray-300">Friends</Link>
        </div>
        <div>
          {isLoading ? (
            <span>Loading...</span>
          ) : isAuthenticated ? (
            <span className="text-green-400">● Logged In</span>
          ) : (
            <Link to="/login" className="text-red-400">● Logged Out</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
