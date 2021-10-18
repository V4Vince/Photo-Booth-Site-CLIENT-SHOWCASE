// import './App.css';
import React, { useEffect, useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

// import { getAboutPage } from "../api";

import Paragraph from "../Components/Paragraph";
import { Typography, Fade, Container } from "@material-ui/core";

import { AboutPageContext, SiteContext } from "../Context/SiteContext";

const useStyles = makeStyles((theme) => ({
  heading: {
    ...theme.heading,
  },
}));

function AboutPage() {
  const classes = useStyles();

  const [aboutPage] = useContext(AboutPageContext);

  if (!aboutPage) {
    return null;
  }

  return (
    <Fragment>
      <Fade in timeout={1000}>
        <div style={{ width: "100%", backgroundColor: "white" }}>
          <img
            style={{
              display: "block",
              // width: "100%",
              height: "100vh",
              // maxWidth: "500px",
              margin: "auto",
            }}
            src={aboutPage.url}
            alt={"about image"}
          />
        </div>
      </Fade>

      <Container maxWidth="md">
        <Fade in timeout={2000}>
          <Fragment>
            <Typography className={classes.heading} align="center">
              {aboutPage.title}
            </Typography>

            <Paragraph>{aboutPage.body}</Paragraph>
          </Fragment>
        </Fade>
      </Container>
    </Fragment>
  );
}

export default AboutPage;
