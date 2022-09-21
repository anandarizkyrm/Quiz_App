import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="fixed h-20 flex items-center justify-center x top-0 inset-x-0 z-40 bg-opacity-60 backdrop-filter backdrop-blur-sm text-gray-300 border-b border-gray-800 w-full">
      <div className="flex width w-full justify-between items-center">
        <Link
          to="/"
          className="bg-clip-text text-transparent text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-gray-400"
        >
          QuizzApp
        </Link>
        <img src="./icon.ico" width={40} alt="icon" />
      </div>
    </nav>
  );
};

export default NavBar;
