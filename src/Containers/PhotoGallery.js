// import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect } from "react";
import { Container, Fade, Typography } from "@material-ui/core";

import ImageGrid from "../Components/ImageGrid";

import { GalleryPageContext, SiteContext } from "../Context/SiteContext";

// import { getGalleryPage } from "../api";
import Paragraph from "../Components/Paragraph";
import VerticalSpacer from "../Components/VerticalSpacer";

const useStyles = makeStyles((theme) => ({
  heading: {
    ...theme.heading,
  },
}));

function PhotoGallery() {
  const classes = useStyles();
  const [galleryPage, galleryImages] = useContext(GalleryPageContext);
  // const [loadStateData] = useContext(SiteContext);

  // useEffect(() => {
  //   if (!galleryPage) {
  //     getGalleryPage().then((data) => loadStateData("GALLERY_PAGE", data));
  //   }
  // }, []);

  return (
    <Container maxWidth="md">
      {galleryPage && (
        <Fade in timeout={1000}>
          <div>
            <Typography className={classes.heading} align="center">
              {galleryPage.title}
            </Typography>
            <Paragraph>{galleryPage.body}</Paragraph>
          </div>
        </Fade>
      )}
      <VerticalSpacer top={50} />
      <ImageGrid images={galleryImages} />
    </Container>
  );
}

export default PhotoGallery;
