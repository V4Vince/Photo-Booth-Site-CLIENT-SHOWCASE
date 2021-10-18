import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { makeStyles } from "@material-ui/core/styles";

import {
  CircularProgress,
  Grid,
  IconButton,
  Zoom,
  Card,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: "hidden",
    transition: "transform 0.5s ease-in-out",
    "&:hover": { transform: "scale3d(1.15, 1.15, 1)" },
  },
  grid: {
    height: 250,
    overflow: "hidden",
    position: "relative",
  },
}));

const ImageGrid = ({ images, handleDelete }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      {/* !! makes a variable into a boolean */}
      {!!images.length &&
        images.map((image, index) => {
          return (
            <Grid item xs={12} md={4} key={index} className={classes.grid}>
              {handleDelete && (
                <div style={{ position: "absolute", zIndex: 99 }}>
                  <IconButton
                    aria-label="delete"
                    style={{ color: "white", backgroundColor: "red" }}
                    onClick={() => handleDelete(image.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </div>
              )}
              <Card style={{ borderRadius: 0 }} raised>
                <LazyLoadImage
                  className={classes.container}
                  alt="gallery image"
                  height={250}
                  effect="blur"
                  // placeholder={<CircularProgress color="primary" />}
                  src={image.url} // use normal <img> attributes as props
                />
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default ImageGrid;
