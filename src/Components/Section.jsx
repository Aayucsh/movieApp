import React from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Section = ({ data }) => {
  return data && data.backdrop_path ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-zinc-500 w-full h-[480px] relative  "
    >
      <Link to={`${data.media_type}/details/${data.id}`} className="absolute bottom-5 pl-5 ">
        <h1 className="text-5xl font-semibold pb-2 ">
          {data.name || data.title}
        </h1>
        <p className="pb-2 w-[50%]">{data.overview}</p>
        <button
          className="border-2 p-3 border-gray-600 "
        >
          Watch Trailer
        </button>
      </Link>
      <div className="absolute inset-0 h-16 bg-gradient-to-t from-transparent to-[#0C0C0C]"></div>
    </div>
  ) : (
    <Loader />
  );
};

export default Section;
