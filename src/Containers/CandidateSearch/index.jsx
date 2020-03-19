import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import UserCard from "Components/UserCard";
import CandidateForm from "Components/CandidateForm";
import Table from "Components/Table";
import "./CandidateSearch.scss";

const CandidateSearch = () => {
  const { repos, profile } = useSelector(state => state.candidate);

  return (
    <div className="candidate-search">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CandidateForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserCard userInfo={profile} />
        </Grid>
        <Grid item xs={12}>
          <Table data={repos} />
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateSearch;
