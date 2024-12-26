import React from "react";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

export const loadtvdata = (id) => async (dispatch) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videoes = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    let tvdata = {
      details: details.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videoes: videoes.data.results.find(e => e.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadtv(tvdata));
  } catch (error) {
    console.log("error: ", error);
  }
};
