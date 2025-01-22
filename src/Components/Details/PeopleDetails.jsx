import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import Topnav from "../Topnav";
import HCards from "../HCards";
import { loadpeopledata } from "../../store/actions/peopleActions";

const PeopleDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.people);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadpeopledata(id));
      setLoading(false);
    };
    fetchData();
    console.log(info);
  }, [id, dispatch]);

  if (loading) return <Loader />;

  if (!info) {
    return <div className="text-white">people data not found.</div>;
  }

  return (
    <div className="w-full relative">
      <i
        onClick={() => navigate("/")}
        className="ri-home-line hover:bg-blue-800 flex justify-center rounded-full items-center h-10 w-10 absolute top-1 left-0 z-40 sm:top-8 sm:left-10 transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95"
      ></i>

      <Topnav />
      <div className="px-4 md:px-36 pt-10 w-full h-auto">
        <div className="flex flex-col md:flex-row">
          <img
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            className="h-96 w-full md:w-64 rounded-md object-cover"
          />
          <div className="flex flex-col pt-8 px-4 md:px-28">
            <h1 className="text-3xl md:text-5xl pb-4 font-bold">{info.details.name}</h1>
            <p className="text-gray-400">
              Known For: {info.details.known_for_department}
            </p>
            <p className="text-gray-400">
              Birth Date: {info.details.birthday}
            </p>
            <p className="text-gray-400 ">
              Place of birth: {info.details.place_of_birth}
            </p>
            <p className="text-gray-400">
              Gender: {info.details.gender===1?"Female" : "Male"}
            </p>
            <p className="text-gray-400 ">
              Death: {info.details.deathday ? info.details.deathday: "Alive"}
            </p>
            <p className="text-gray-400 ">
              Also Known As: {info.details.also_known_as[0]}
            </p>
            <div className="flex gap-4 pt-8 text-2xl">
            {info.externalid.wikidata_id ? <a href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} className="ri-global-line"></a>:""}
            {info.externalid.facebook_id ?<a href={`https://www.facebook.com/${info.externalid.facebook_id}`} className="ri-facebook-line"></a>:""}
            {info.externalid.instagram_id ?<a href={`https://www.instagram.com/${info.externalid.instagram_id}`} className="ri-instagram-line"></a>:""}
            {info.externalid.twitter_id ?<a href={`https://www.twitter.com/${info.externalid.twitter_id}`} className="ri-twitter-x-line"></a>:""}
            </div>
          </div>
        </div>
        <p className="pl-2 mt-5">{info.details.biography}</p>
        <h2 className="text-2xl font-semibold pb-0 mt-10">Work:</h2>
        <HCards data={info.combinedCredits.cast} />
      </div>
    </div>
  );
};

export default PeopleDetails;
