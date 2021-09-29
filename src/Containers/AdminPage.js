import React, { useContext, Fragment, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Button, Container, Typography } from "@material-ui/core";

import SignInForm from "../Components/SignInForm";
import EditAboutPageForm from "../Components/EditAboutPageForm";
import EditPackagesPageForm from "../Components/EditPackagesPageForm";
import EditGalleryPageForm from "../Components/EditGalleryPage";

import { AuthContext } from "../Context/AuthContext";
import BookingInquiriesPage from "./BookingInquiries";
import BookedEvents from "./BookedEvents";
import EditTemplatePage from "../Components/EditTemplatePage";
import PopUp from "../Components/PopUp";

const useStyles = makeStyles((theme) => ({
  heading: {
    ...theme.heading,
  },
}));

function AdminPage() {
  const [auth, handleLogin, handleSignOut, resetPopUp] =
    useContext(AuthContext);

  const classes = useStyles();

  const signInForm = <SignInForm submitForm={handleLogin} />;

  const adminComponent = (
    <Container maxWidth="md">
      <span style={{ float: "right" }}>
        <Button style={{ color: "red" }} variant="text" onClick={handleSignOut}>
          Sign Out
        </Button>
      </span>
      <Switch>
        <Route exact path="/admin">
          <BookedEvents />
        </Route>
        <Route path="/admin/edit-about">
          <EditAboutPageForm />
        </Route>
        <Route path="/admin/edit-pricing">
          <EditPackagesPageForm />
        </Route>
        <Route path="/admin/edit-gallery">
          <EditGalleryPageForm />
        </Route>
        <Route path="/admin/booking-inquiries">
          <BookingInquiriesPage />
        </Route>
        <Route path="/admin/booked-events">
          <BookedEvents />
        </Route>
        <Route path="/admin/edit-templates">
          <EditTemplatePage />
        </Route>
      </Switch>
    </Container>
  );

  return (
    <Fragment>
      <Typography className={classes.heading} align="center">
        Admin Page
      </Typography>
      {auth.isSignedIn ? adminComponent : signInForm}
      <PopUp />
    </Fragment>
  );
}

export default AdminPage;
