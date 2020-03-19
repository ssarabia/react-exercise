import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { getProfileUrl, getReposUrl } from "Utils/constants";

export const initialState = {
  repos: [],
  profile: {},
  fetching: false,
  error: ""
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    requestInProgress(state) {
      state.fetching = true;
    },
    fetchCandidateInfoSuccess(state, action) {
      state.repos = action.payload.repoData;
      state.profile = action.payload.profileData;
      state.fetching = true;
    },
    fetchCandidateInfoError(state, action) {
      state.error = action.payload;
      state.fetching = false;
    },
    setExtraCandidateData(state, action) {
      const { email, birthdate } = action.payload;
      state.profile = { ...state.profile, email, birthdate };
    }
  }
});

export const {
  requestInProgress,
  fetchCandidateInfoSuccess,
  fetchCandidateInfoError,
  setExtraCandidateData
} = candidateSlice.actions;

export function fetchCandidateInfo(username) {
  return dispatch => {
    dispatch(requestInProgress());
    const fetchProfile = axios.get(getProfileUrl(username));
    const fetchRepo = axios.get(getReposUrl(username));
    return Promise.all([fetchProfile, fetchRepo])
      .then(response => {
        const [profileResponse, repoResponse] = response;
        dispatch(
          fetchCandidateInfoSuccess({
            profileData: profileResponse.data,
            repoData: repoResponse.data
          })
        );
      })
      .catch(err => {
        dispatch(fetchCandidateInfoError(err.toString()));
        throw err;
      });
  };
}

export default candidateSlice.reducer;
