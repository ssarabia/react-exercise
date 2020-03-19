import React from "react";
import { CircularProgress, Backdrop } from "@material-ui/core";
import PropTypes from "prop-types";

import "./Loader.scss";

const Loader = ({ open }) => (
  <Backdrop open={open} className="loader">
    <CircularProgress color="primary" />
  </Backdrop>
);

Loader.propTypes = {
  open: PropTypes.bool
};

export default Loader;
