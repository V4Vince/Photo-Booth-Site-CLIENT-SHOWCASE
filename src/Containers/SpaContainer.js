import { Fragment, useEffect, useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(null);
  const classes = useStyles();
  let packageRef = null;
  let galleryRef = null;
  let aboutRef = null;
  let templatePageRef = null;

  console.log("ROUTE PROPS", props);

  //Listens to when route changes within the component
  useEffect(() => {
    let location = props.history.location.pathname;
    console.log("1st USE EFFECT", location);
    if (props.history.location.pathname === "/about") {
      setCurrentPage(aboutRef);
    }
    if (props.history.location.pathname === "/templates") {
      setCurrentPage(templatePageRef);
    }
    if (props.history.location.pathname === "/pricing") {
      setCurrentPage(packageRef);
    }
    if (props.history.location.pathname === "/gallery") {
      setCurrentPage(galleryRef);
    }
    // console.log("ANY LISTENERS?", listener);
  }, [props.history.location.pathname, props.history, props]);

  useEffect(() => {
    console.log("2ND USE EFFECT", currentPage);

    if (currentPage) {
      currentPage.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  return (
    <Fragment>
      <div
        className={classes.anchorContainer}
        id="about_page"
        ref={(ref) => (aboutRef = ref)}
      ></div>
      <VerticalSpacer top={1} bottom={100} showBackgroundColor>
        <AboutPage />
      </VerticalSpacer>
      <div
        className={classes.anchorContainer}
        id="template_page"
        ref={(ref) => (templatePageRef = ref)}
      ></div>
      <VerticalSpacer top={50} bottom={100}>
        <TemplatePage />
      </VerticalSpacer>
      <div
        className={classes.anchorContainer}
        id="package_page"
        ref={(ref) => (packageRef = ref)}
      ></div>
      <VerticalSpacer top={50} bottom={100} showBackgroundColor>
        <PackagesPage />
      </VerticalSpacer>

      <div
        className={classes.anchorContainer}
        id="gallery_page"
        ref={(ref) => (galleryRef = ref)}
      ></div>
      <VerticalSpacer top={50} bottom={100}>
        <GalleryPage />
      </VerticalSpacer>
    </Fragment>
  );
};

export default SpaContainer;
