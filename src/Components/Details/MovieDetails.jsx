import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadmoviedata } from "../../store/actions/movieActions";
import Loader from "../Loader";
import Topnav from "../Topnav";
import HCards from "../HCards";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(loadmoviedata(id));
      setLoading(false); 
    };

    fetchData();
  }, [id, dispatch]);

  useEffect(() => {
    if (!info) setLoading(true); 
  }, [info]);

  if (loading) return <Loader />;

  if (!info) {
    return <div className="text-white">Movie data not found.</div>;
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
            <h1 className="text-5xl font-bold">{info.details.title}</h1>
            <p className="text-gray-400">
              Release Date: {info.details.release_date}
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
              {info.watchproviders ? (
                <>
                  {info.watchproviders.flatrate &&
                    info.watchproviders.flatrate.length > 0 && (
                      <img
                        src={`https://image.tmdb.org/t/p/original/${info.watchproviders.flatrate[0].logo_path}`}
                        className="inline-block h-12 w-12 rounded my-4"
                        alt="Flatrate provider"
                      />
                    )}
                  <br />
                  {info.watchproviders.rent &&
                    info.watchproviders.rent.length > 0 && (
                      <div className="inline-flex items-center my-4">
                        <p className="mr-2">Rent:</p>
                        {info.watchproviders.rent.map((item, index) => (
                          <img
                            key={`rent-${index}`}
                            src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                            className="inline-block h-12 w-12 rounded mx-2"
                            alt={`Rent provider ${index}`}
                          />
                        ))}
                      </div>
                    )}
                  {info.watchproviders.buy &&
                    info.watchproviders.buy.length > 0 && (
                      <div className="inline-flex items-center ml-10 my-4">
                        <p className="mr-2">Buy:</p>
                        {info.watchproviders.buy.map((item, index) => (
                          <img
                            key={`buy-${index}`}
                            src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                            className="inline-block h-12 w-12 rounded mx-2"
                            alt={`Buy provider ${index}`}
                          />
                        ))}
                      </div>
                    )}
                </>
              ) : null}
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-10">Recommendations:</h2>
        <HCards data={info.recommendations || info.similar} />
      </div>
    </div>
  );
};

export default MovieDetails;
