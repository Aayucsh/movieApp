import React, { useEffect } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const HCards = ({data}) => {
  
  if (data)
    return data ? (
        <div className="flex h-72 gap-10 pt-2 container overflow-auto">
          {data.map((items, index) => {
            return (
              <Link to={`/${items.media_type}/details/${items.id}`} key={index} className="h-56 w-32 rounded-md shrink-0 ">
                <img
                  src={items.poster_path ? `https://image.tmdb.org/t/p/original/${items.poster_path}`: "/image.png"}
                  alt=""
                  className="w-44 h-44 rounded-lg object-cover "
                />
                <h1 className="text-sm">{items.name || items.title}</h1>
              </Link>
            );
          })}
        </div>
    ):<Loader/>
};

export default HCards;
