import React, { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { PiPlayCircleBold } from "react-icons/pi";
import { TiStarOutline } from "react-icons/ti";
import { LuTv } from "react-icons/lu";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        aria-expanded={isSidebarOpen}
        type="button"
        className="absolute top-1 left-0 items-center p-2 z-40  text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-900 dark:focus:ring-gray-600"
      >
        <span className="sr-only">{isSidebarOpen ? "Close sidebar" : "Open sidebar"}</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
    <aside id="logo-sidebar" className={`min-h-screen border-r-2 border-zinc-800 bg-[#0C0C0C] p-10 fixed top-0 left-0 z-40  max-w-xs h-screen text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:static sm:min-h-screen `}
        aria-label="Sidebar">
      <Link to="/" className="text-3xl font-semibold ">
        Movies
      </Link>
      <div className="flex flex-col gap-4 pt-10 w-28 font-semibold list-none ">
        <h1>NewFeeds</h1>
        <Link
          to="/trending"
          className="flex items-center gap-2  p-2 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95"
        >
          <FaArrowTrendUp />
          Trending
        </Link>
        <Link
          to="/popular"
          className="flex items-center gap-2  p-2 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95"
        >
          <TiStarOutline />
          Popular
        </Link>
        <Link
          to="/movies"
          className="flex items-center gap-2  p-2 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95"
        >
          <PiPlayCircleBold />
          Movies
        </Link>
        <Link
          to="/tvshows"
          className="flex items-center gap-2  p-2 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95"
        >
          <LuTv />
          TV Shows
        </Link>
        <Link
          to="/people"
          className="flex items-center gap-2  p-2 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95"
        >
          <MdOutlinePeopleAlt />
          People
        </Link>
      </div>
    </aside>
    {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
