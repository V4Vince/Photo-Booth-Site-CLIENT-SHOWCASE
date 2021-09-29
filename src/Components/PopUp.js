import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useContext } from "react";
import { SiteContext } from "../Context/SiteContext";
import { Fragment } from "react";

const PopUp = () => {
  const [loadStateData, loading, resetLoading] = useContext(SiteContext);

  const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );

  const appPopUp = (
    <Snackbar
      open={loading.isLoading}
      autoHideDuration={2000}
      onClose={resetLoading}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      {loading.status === "success" ? (
        <Alert onClose={resetLoading} severity="success">
          {loading.message}
        </Alert>
      ) : loading.status === "failed" ? (
        <Alert severity="error">{loading.message}</Alert>
      ) : null}
    </Snackbar>
  );

  return <Fragment>{appPopUp}</Fragment>;
};

export default PopUp;
