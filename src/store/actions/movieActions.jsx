import React from "react";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const loadmoviedata = (id) => async (dispatch) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const videoes = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    let moviedata = {
      details: details.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations,
      videoes: videoes.data.results.find(e => e.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadmovie(moviedata));
  } catch (error) {
    console.log("error: ", error);
  }
};
