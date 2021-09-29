// import './App.css';
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Typography, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookingForm from "../Components/BookingForm";
import { PackagePageContext, SiteContext } from "../Context/SiteContext";

import { createBookingRequest, getPricingPackages } from "../api";

const useStyles = makeStyles((theme) => ({
  heading: {
    ...theme.heading,
  },
}));

function RequestBookingPage() {
  const classes = useStyles();
  const history = useHistory();
  const [packagePage, packages] = useContext(PackagePageContext);
  const [loadStateData] = useContext(SiteContext);

  useEffect(() => {
    if (!packages.length) {
      getPricingPackages()
        .then((data) => loadStateData("PACKAGES", data))
        .catch((error) => console.log("ERROR"));
    }
  }, []);

  const submitBookingRequest = (form) =>
    createBookingRequest(form).then((response) =>
      history.push("/request-booking_success")
    );

  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center">
        <Typography className={classes.heading}>Request a booking</Typography>
        <Grid item xs={12} md={10}>
          <BookingForm
            packages={packages}
            submitBookingRequest={submitBookingRequest}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default RequestBookingPage;
