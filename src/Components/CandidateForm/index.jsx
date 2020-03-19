import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { CandidateSchema } from "Utils/validationSchemas";
import PropTypes from "prop-types";

import {
  fetchCandidateInfo,
  setExtraCandidateData,
  resetCandidateData
} from "Slices/Candidate/candidate.slice";
import "./CandidateForm.scss";

const CandidateForm = ({ requestErrorStatus }) => {
  const { register, handleSubmit, errors, setValue, reset } = useForm({
    validationSchema: CandidateSchema
  });
  const dateFns = new DateFnsUtils();
  const [birthdate, setBirthDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    register({ name: "birthdate" });
  }, [register]);

  useEffect(() => {
    setValue("birthdate", birthdate);
  }, [birthdate, setValue]);

  const onChangeDate = date => {
    setBirthDate(date);
  };

  const onSubmit = data => {
    dispatch(fetchCandidateInfo(data.username)).then(() => {
      dispatch(
        setExtraCandidateData({
          email: data.email,
          birthdate: dateFns.format(data.birthdate, "MM/dd/yyyy")
        })
      );
      reset();
      setBirthDate(new Date());
    });
  };

  const handleReset = () => {
    dispatch(resetCandidateData());
    reset();
    setBirthDate(new Date());
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleSubmit(onSubmit)} className="candidate-form">
        <TextField
          variant="outlined"
          className="candidate-search__input"
          margin="normal"
          label="Names"
          name="names"
          inputRef={register}
          error={!!errors.names}
          helperText={errors.names ? errors.names.message : ""}
        />
        <TextField
          variant="outlined"
          className="candidate-search__input"
          margin="normal"
          label="Surnames"
          name="surnames"
          inputRef={register}
          error={!!errors.surnames}
          helperText={errors.surnames ? errors.surnames.message : ""}
        />
        <TextField
          variant="outlined"
          className="candidate-search__input"
          margin="normal"
          label="Id Number"
          name="id"
          inputRef={register}
          error={!!errors.id}
          helperText={errors.id ? errors.id.message : ""}
        />
        <DatePicker
          inputVariant="outlined"
          className="candidate-search__input"
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="Birth Date"
          value={birthdate}
          name="birthdate"
          onChange={onChangeDate}
          error={!!errors.birthdate}
          helperText={errors.birthdate ? errors.birthdate.message : ""}
        />
        <TextField
          className="candidate-search__input"
          variant="outlined"
          margin="normal"
          label="Email"
          name="email"
          inputRef={register}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
        <TextField
          variant="outlined"
          className="candidate-search__input"
          margin="normal"
          label="Github Username"
          name="username"
          inputRef={register}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ""}
        />
        {requestErrorStatus !== null && (
          <Alert severity="error" className="candidate-form__alert">
            {requestErrorStatus === 404 ? "User Not Found" : "Unexpected Error"}
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="candidate-form__button"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          onClick={handleReset}
          className="candidate-form__button"
        >
          Reset
        </Button>
      </form>
    </MuiPickersUtilsProvider>
  );
};

CandidateForm.propTypes = {
  requestErrorStatus: PropTypes.number
};

export default CandidateForm;
