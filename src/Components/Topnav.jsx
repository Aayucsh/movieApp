import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import image from "/image.png";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [results, setresults] = useState([]);

  const getSearch = () => {
    axios
      .get(`/search/multi?query=${query}`)
      .then((searches) => {
        setresults(searches.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (query) {
      getSearch();
    }
  }, [query]);

  return (
    <div className="p-2 w-full flex justify-center items-center z-10 pb-1 relative">
      <i className="ri-search-line mr-1 bg-zinc-900 h-9 w-9 flex justify-center items-center rounded-full"></i>

      <div className="relative w-[400px]">
        <input
          onChange={(e) => setquery(e.target.value)}
          className="h-9 w-full border-white bg-zinc-900 p-2 font-semibold outline-none rounded-lg text-white pr-10"
          type="text"
          value={query}
        />
        {query.length > 0 && (
          <i
            onClick={() => setquery("")}
            className="ri-close-line hover:bg-zinc-700 h-5 w-5 mr-2 flex items-center justify-center rounded-full cursor-pointer absolute right-0 top-1/2 -translate-y-1/2"
          ></i>
        )}
      </div>

      {results.length > 0 && query && (
        <div
          id="style-2"
          className="h-96 w-[590px] mt-2 bg-zinc-900 rounded-md top-12 absolute flex flex-col overflow-auto container"
        >
          {results.map((items, index) => (
            <Link
              to={`/${items.media_type}/details/${items.id}`}
              onClick={() => setquery("")}
              key={index}
              className="h-24 w-full flex items-center px-5 my-1 hover:bg-zinc-800"
            >
              <img
                src={
                  items.poster_path || items.backdrop_path || items.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        items.poster_path ||
                        items.backdrop_path ||
                        items.profile_path
                      }`
                    : image
                }
                className="object-cover h-20 w-16 mr-5"
                alt=""
              />
              <h1>{items.name || items.title}</h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
