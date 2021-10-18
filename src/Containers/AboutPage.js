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
        <Grid
          container
          justifyContent="center"
          style={{ width: "100%", backgroundColor: "white" }}
        >
          <Grid item xs={12} md={10} lg={8} style={{}}>
            <img
              style={{
                // display: "block",
                // maxWidth: "100vw",
                objectFit: "cover",
                height: "100vh",
                width: "100%",
                margin: 0,
              }}
              src={aboutPage.url}
              alt={"about image"}
            />
          </Grid>
        </Grid>
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
