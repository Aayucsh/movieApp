import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import Cards from "./Cards";
import Sidebar from "./Sidebar";

const Popular = () => {
  const [val, setVal] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("movie");
  const [hasMore, setHasMore] = useState(true);

  const getPopular = async (currentPage, currentCategory) => {
    try {
      const response = await axios.get(`/${currentCategory}/popular?page=${currentPage}`);
      const results = response.data.results;

      if (results.length === 0) {
        setHasMore(false); 
      } else {
        setVal((prev) => [...prev, ...results]);
      }
    } catch (error) {
      console.error("Error fetching popular content:", error);
    }
  };

  useEffect(() => {
    setVal([]); 
    setPage(1); 
    setHasMore(true);
    getPopular(1, category);
  }, [category]);

  useEffect(() => {
    if (page > 1) {
      getPopular(page, category);
    }
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };
  
  return val ? (
    <div className="w-full flex">
      <Sidebar/>
      <div className="w-[85%]">
        <Topnav />
        <div className="px-10 absolute right-0 flex items-center justify-between w-[85%]">
        <h1 className="text-4xl">Popular</h1>
          <Dropdown
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <InfiniteScroll
            className="p-10 mt-7 flex flex-row w-full flex-wrap gap-8 gap-y-12"
            dataLength={val.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader />}
          >
            {val.map((item, index) => (
              <Cards item={item} key={index} title={category} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  ): (<Loader/>)
};

export default Popular;
