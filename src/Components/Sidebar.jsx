import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { PiPlayCircleBold } from "react-icons/pi";
import { TiStarOutline } from "react-icons/ti";
import { LuTv } from "react-icons/lu";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="min-h-screen w-[15%] border-r-2 sticky top-0 pl-12 border-zinc-800 p-8 z-10">
      <Link to="/" className="text-3xl font-semibold ">
        Movies
      </Link>
      <div className="flex flex-col gap-4 pt-10 font-semibold list-none ">
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
    </div>
  );
};

export default Sidebar;
