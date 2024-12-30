import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import Topnav from "../Topnav";
import HCards from "../HCards";
import { loadtvdata } from "../../store/actions/tvActions";

const TvDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(loadtvdata(id));
      } catch (err) {
        setError("Failed to load TV data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, dispatch]);

  if (loading) return <Loader />;

  if (!info) {
    return <div className="text-white">tv data not found.</div>;
  }

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.85), rgba(0,0,0,.95)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full relative"
    >
      <Topnav />
      <i
        onClick={() => navigate("/")}
        className="ri-home-line hover:bg-blue-800 flex justify-center rounded-full items-center h-10 w-10 absolute top-8 left-10 transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95"
      ></i>

      <div className="px-20 pt-10 w-full h-[80%]">
        <div className="flex">
          <img
            src={`https://image.tmdb.org/t/p/original/${info.details.poster_path}`}
            className="h-84 w-64 rounded-md object-cover"
          />
          <div className="flex flex-col pt-4 px-20">
            <h1 className="text-5xl font-bold">{info.details.name}</h1>
            <p className="text-gray-400">
              Release Date: {info.details.first_air_date}
            </p>
            <p className="text-gray-400">
              Rating: {info.details.vote_average.toFixed(1)}
            </p>
            <p className="text-gray-400">
              Genre: {info.details.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="font-semibold text-xl mt-5 ">
              {info.details.tagline}
            </p>
            <p className="mt-2">{info.details.overview}</p>
            {info.videoes ? (
              <a
                href={`https://www.youtube.com/watch?v=${info.videoes.key}`}
                className="mt-4 bg-blue-600 text-white w-32 py-2 px-4 rounded hover:bg-blue-700"
              >
                Play Trailer
              </a>
            ) : (
              ""
            )}
            <p className="text-gray-400">
              {info.watchproviders ?  (
                 <img
                  src={`https://image.tmdb.org/t/p/original/${info.watchproviders.flatrate[0].logo_path}`}
                  className="inline-block h-12 w-12 rounded my-4"
                />
              ) : (
                <p className="mt-4">No Watch Providers</p>
              )}
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-10">Seasons:</h2>
        <div className=" h-72 flex gap-8 mt-2 overflow-auto container ">
          {info.details.seasons.map((items, index) => {
            return (
              <div key={index} className="h-52 w-40 rounded-md shrink-0 ">
                <img
                  src={
                    items.poster_path
                      ? `https://image.tmdb.org/t/p/original/${items.poster_path}`
                      : "/image.png"
                  }
                  alt=""
                  className="h-56 w-40 rounded-lg object-cover "
                />
                <h1 className="text-sm">{items.name || items.title}</h1>
              </div>
            );
          })}
        </div>
        {info.recommendations.length > 0 || info.similar.length > 0 ? (
          <h2 className="text-2xl font-semibold mt-5">Recommendations:</h2>
        ) : (
          ""
        )}
        <HCards data={info.recommendations || info.similar} />
      </div>
    </div>
  );
};

export default TvDetails;
