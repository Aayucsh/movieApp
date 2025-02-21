import React, { useEffect, useState } from "react";
import Topnav from "./Topnav";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import Cards from "./Cards";
import Sidebar from "./Sidebar";

const People = () => {
  const [val, setVal] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPeople = async (currentPage) => {
    try {
      const response = await axios.get(`/person/popular?page=${currentPage}`);
      const results = response.data.results;

      if (results.length === 0) {
        setHasMore(false); 
      } else {
        setVal((prev) => [...prev, ...results]);
      }
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    getPeople(page);
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return val ? (
    <div className="w-full flex ">
      <Sidebar/>
      <div >
        <Topnav />
      <h1 className="text-4xl absolute pl-10 ">People</h1>
        <div>
          <InfiniteScroll
            className="p-7 sm:p-10 mt-10 flex sm:pt-7 flex-row w-full justify-between flex-wrap gap-8 gap-y-12"
            dataLength={val.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader/>}
          >
            {val.map((item, index) => (
              <Cards item={item} key={index} title="person" />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  ): (<Loader/>)
};

export default People;
