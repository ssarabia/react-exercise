import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { getProfileUrl, getReposUrl } from "Utils/constants";

export const initialState = {
  repos: [],
  profile: {},
  isFetching: false,
  errorStatus: null,
  showData: false
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    requestInProgress(state) {
      state.isFetching = true;
      state.errorStatus = null;
    },
    fetchCandidateInfoSuccess(state, action) {
      state.repos = action.payload.repoData;
      state.profile = action.payload.profileData;
      state.isFetching = false;
      state.showData = true;
    },
    fetchCandidateInfoError(state, action) {
      state.errorStatus = action.payload;
      state.isFetching = false;
    },
    setExtraCandidateData(state, action) {
      const { email, birthdate } = action.payload;
      state.profile = { ...state.profile, email, birthdate };
    },
    resetCandidateData(state) {
      state.repos = [];
      state.profile = {};
      state.isFetching = false;
      state.errorStatus = null;
      state.showData = false;
    }
  }
});

export const {
  requestInProgress,
  fetchCandidateInfoSuccess,
  fetchCandidateInfoError,
  setExtraCandidateData,
  resetCandidateData
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
        if (err.response) {
          dispatch(fetchCandidateInfoError(err.response.status));
        } else {
          dispatch(fetchCandidateInfoError(0));
        }
        throw err;
      });
  };
}

export default candidateSlice.reducer;
