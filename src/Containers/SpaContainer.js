import { Fragment, useEffect, useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  getGalleryPage,
  getAboutPage,
  getPackagePage,
  getTemplatePage,
} from "../api";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import AboutPage from "./AboutPage";
import PackagesPage from "./PackagesPage";
import GalleryPage from "./PhotoGallery";

import VerticalSpacer from "../Components/VerticalSpacer";
import TemplatePage from "./TemplatePage";

import {
  AboutPageContext,
  PackagePageContext,
  SiteContext,
  GalleryPageContext,
  TemplatePageContext,
} from "../Context/SiteContext";

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
  const [aboutPage] = useContext(AboutPageContext);
  const [templatePage, templates] = useContext(TemplatePageContext);
  const [packagePage, packages] = useContext(PackagePageContext);
  const [galleryPage, galleryImages] = useContext(GalleryPageContext);
  const [loadStateData] = useContext(SiteContext);

  const classes = useStyles();
  let packageRef = null;
  let galleryRef = null;
  let aboutRef = null;
  let templatePageRef = null;

  //Listens to when route changes within the component
  useEffect(() => {
    let location = props.history.location.pathname;
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
    if (currentPage) {
      currentPage.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  useEffect(() => {
    if (!aboutPage) {
      getAboutPage()
        .then((data) => loadStateData("ABOUT_PAGE", data))
        .catch((err) => console.log("ERROR LOADING ABOUT PAGE", err));
    }
    if (!templatePage) {
      getTemplatePage().then((data) => loadStateData("TEMPLATE_PAGE", data));
    }
    if (!packagePage) {
      getPackagePage()
        .then((data) => loadStateData("PACKAGE_PRICING_PAGE", data))
        .catch((error) => console.log("ERROR"));
    }
    if (!galleryPage) {
      getGalleryPage().then((data) => loadStateData("GALLERY_PAGE", data));
    }
  }, []);

  if (!aboutPage) {
    return (
      <Container
        maxWidth="md"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Loading...</Typography>
        <CircularProgress
          style={{ marginTop: 25 }}
          color="primary"
          size={100}
        />
      </Container>
    );
  }

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
