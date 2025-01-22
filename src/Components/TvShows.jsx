import React, { useEffect, useState } from "react";
import Topnav from "./Topnav";
import axios from "../utils/axios";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import Cards from "./Cards";
import Sidebar from "./Sidebar"

const TvShows = () => {
  const [val, setVal] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("airing_today");
  const [hasMore, setHasMore] = useState(true);

  const getTvShows = async (currentPage, currentCategory) => {
    try {
      const response = await axios.get(`/tv/${currentCategory}?page=${currentPage}`);
      const results = response.data.results;

      if (results.length === 0) {
        setHasMore(false); // Stop fetching when no more results
      } else {
        setVal((prev) => [...prev, ...results]);
      }
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  useEffect(() => {
    setVal([]); // Reset data when category changes
    setPage(1); // Reset page to 1 for new category
    setHasMore(true); // Reset hasMore for new fetch
    getTvShows(1, category); // Fetch initial data for the selected category
  }, [category]);

  useEffect(() => {
    if (page > 1) {
      getTvShows(page, category);
    }
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return val ? (
    <div className="w-full flex ">
      <Sidebar/>
      <div >
        <Topnav />
        <div className="px-5 pt-5 sm:pt-0 right-0 items-start sm:absolute sm:right-0 flex flex-col sm:flex-row sm:items-center justify-between w-[85%] ">
        <h1 className="text-4xl">TV Shows</h1>
          <Dropdown
            options={["airing_today", "on_the_air", "popular", "top_rated"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <InfiniteScroll
            className="p-7 sm:p-10 mt-0 sm:mt-10 flex sm:pt-7 flex-row w-full justify-between  flex-wrap gap-8 gap-y-12"
            dataLength={val.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader />}
          >
            {val.map((item, index) => (
              <Cards item={item} key={index} title="tv" />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  ): (<Loader/>)
};

export default TvShows;
