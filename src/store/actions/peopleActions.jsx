import React from "react";
import axios from "../../utils/axios";
import { loadpeople } from "../reducers/peopleSlice";

export const loadpeopledata = (id) => async (dispatch) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    let peopledata = {
      details: details.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
    };
    dispatch(loadpeople(peopledata));
  } catch (error) {
    console.log("error: ", error);
  }
};
