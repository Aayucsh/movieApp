import { Route, Routes } from "react-router-dom"
import Home from "./Components/Home"
import Trending from "./Components/Trending"
import Movies from "./Components/Movies"
import Popular from "./Components/Popular"
import People from "./Components/People"
import TvShows from "./Components/TvShows"
import MovieDetails from "./Components/Details/MovieDetails"
import Sidebar from "./Components/Sidebar"
import TvDetails from "./Components/Details/TvDetails"
import PeopleDetails from "./Components/Details/PeopleDetails"



function App() {

  return (
    <div className="min-h-screen w-full relative text-white bg-[#0C0C0C] flex ">

      <Routes>
        <Route element={<Home/>} path="/" />
        <Route element={<Trending/>} path="/trending" />
        <Route element={<Popular/>} path="/popular" />
        <Route element={<Movies/>} path="/movies" />
        <Route element={<MovieDetails/>} path="/movie/details/:id" />
        <Route element={<TvDetails/>} path="/tv/details/:id" />
        <Route element={<PeopleDetails/>} path="/person/details/:id" />
        <Route element={<TvShows/>} path="/tvshows" />
        <Route element={<People/>} path="/people" />
      </Routes>
    </div>
  )
}

export default App
