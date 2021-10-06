// import './App.css';
import React, { useEffect, useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getAboutPage } from "../api";

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
  const [loadStateData] = useContext(SiteContext);

  useEffect(() => {
    if (!aboutPage) {
      getAboutPage()
        .then((data) => loadStateData("ABOUT_PAGE", data))
        .catch((err) => console.log("ERROR LOADING ABOUT PAGE", err));
    }
  }, []);

  if (!aboutPage) {
    return null;
  }

  return (
    <Fragment>
      <Fade in timeout={1000}>
        <div>
          <img
            style={{
              display: "block",
              width: "100%",
              // height: "250px",
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
