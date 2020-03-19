import {
  string as yupString,
  object as yupObject,
  number as yupNumber,
  date as yupDate
} from "yup";

export const CandidateSchema = yupObject().shape({
  names: yupString().required("Required"),
  surnames: yupString().required("Required"),
  id: yupNumber()
    .typeError("A numeric value is required")
    .integer("Must be an integer")
    .required("Required"),
  birthdate: yupDate().required("Required"),
  email: yupString()
    .required("Required")
    .email("Invalid Email Format"),
  username: yupString().required("Required")
});
