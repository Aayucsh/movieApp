import React from "react";
import Topnav from "./Topnav";
import Section from "./Section";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Trending from "./Trending";
import HCards from "./HCards";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import Dropdown from "./Dropdown";

const Home = () => {
  const [trend, settrend] = useState([]);
  const [val, setval] = useState();
  const [Category, setCategory] = useState("all");
  const getTrend = () => {
    axios
      .get("/trending/all/day")
      .then((ans) => {
        const lits = (Math.random() * ans.data.results.length).toFixed();
        settrend(ans.data.results[lits]);
        setval(ans.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getCategory = () => {
    axios
      .get(`/trending/${Category}/day`)
      .then((ans) => {
        setval(ans.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTrend();
  }, []);

  useEffect(() => {
    getCategory();
  }, [Category]);

  return val ? (
    <div className="flex w-full ">
      <Sidebar />
      <div className="overflow-auto w-[85%] ">
        <Topnav />
        <Section data={trend} />
        <div className="w-full h-[300px]">
          <div className="flex justify-between mx-2 ">
            <h1 className="text-2xl m-3 mb-0">Trending Currently</h1>
            <Dropdown
              options={["all", "movie", "tv"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <HCards data={val} />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Home;
