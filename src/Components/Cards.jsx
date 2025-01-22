import React from "react";
import { Link } from "react-router-dom";

const Cards = ({item, title}) => {
  if(item)
  return (
    <Link to={`/${item.media_type || title}/details/${item.id}`}className={`h-56 w-32  sm:h-72 sm:w-52 rounded-md shrink-0`}>
      <img
        src={
          item.poster_path || item.profile_path
            ? `https://image.tmdb.org/t/p/original/${item.poster_path || item.profile_path }`
            : "/image.png"
        }
        className="h-44  sm:w-48 sm:h-64  rounded-lg object-cover"
      />
      <h1 className="text-lg mt-2">{item.name || item.title}</h1>
    </Link>
  );
};

export default Cards;
