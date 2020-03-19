import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { CandidateSchema } from "Utils/validationSchemas";

import {
  fetchCandidateInfo,
  setExtraCandidateData
} from "Slices/Candidate/candidate.slice";

const CandidateForm = () => {
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
      localStorage.setItem("profile", JSON.stringify(data));
      reset();
      setBirthDate(new Date());
    });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <input type="submit" />
      </form>
    </MuiPickersUtilsProvider>
  );
};

export default CandidateForm;
