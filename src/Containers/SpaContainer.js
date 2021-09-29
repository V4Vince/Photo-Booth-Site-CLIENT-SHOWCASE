import { Fragment, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

// import "./App.css";

import AboutPage from "./AboutPage";
import PackagesPage from "./PackagesPage";
import GalleryPage from "./PhotoGallery";

import VerticalSpacer from "../Components/VerticalSpacer";
import TemplatePage from "./TemplatePage";

const useStyles = makeStyles((theme) => ({
  anchorContainer: {
    height: 150,
    marginBottom: 100,
    position: "absolute",
    left: 0,
    right: 0,
    transform: "translateY(-50px)",
    // backgroundColor: "rgba(255, 255, 000, 0.1)",
  },
}));

const SpaContainer = (props) => {
  const classes = useStyles();
  let packageRef = null;
  let galleryRef = null;
  let aboutRef = null;
  let templatePageRef = null;

  //Listens to when route changes within the component
  useEffect(() => {
    if (props.match.path === "/about") {
      aboutRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (props.match.path === "/templates") {
      templatePageRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (props.match.path === "/pricing") {
      packageRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (props.match.path === "/gallery") {
      galleryRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [props.match.path]);

  return (
    <Fragment>
      <div
        className={classes.anchorContainer}
        ref={(ref) => {
          aboutRef = ref;
        }}
      ></div>
      <VerticalSpacer top={1} bottom={100} showBackgroundColor>
        <AboutPage />
      </VerticalSpacer>
      <div
        className={classes.anchorContainer}
        ref={(ref) => {
          templatePageRef = ref;
        }}
      ></div>
      <VerticalSpacer top={50} bottom={100}>
        <TemplatePage />
      </VerticalSpacer>
      <div
        className={classes.anchorContainer}
        ref={(ref) => {
          packageRef = ref;
        }}
      ></div>
      <VerticalSpacer top={50} bottom={100} showBackgroundColor>
        <PackagesPage />
      </VerticalSpacer>

      <div
        className={classes.anchorContainer}
        ref={(ref) => {
          galleryRef = ref;
        }}
      ></div>
      <VerticalSpacer top={50} bottom={100}>
        <GalleryPage />
      </VerticalSpacer>
    </Fragment>
  );
};

export default SpaContainer;
