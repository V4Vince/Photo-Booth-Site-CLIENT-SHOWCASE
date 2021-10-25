import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { makeStyles } from "@material-ui/core/styles";
import { useInView } from "react-intersection-observer";

import {
  CircularProgress,
  Grid,
  IconButton,
  Zoom,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  container: {
    // objectFit: "cover",
    // overflow: "hidden",
    // display: "flex",
    // justifyContent: "center",
    transition: "transform 0.5s ease-in-out",
    "&:hover": { transform: "scale3d(1.15, 1.15, 1)" },
  },
  image: {
    objectFit: "cover",
    // objectPosition: "50% 50%",
  },
  grid: {
    height: 250,
    overflow: "hidden",
    position: "relative",
  },
}));

const ImageGrid = ({ images, handleDelete }) => {
  const classes = useStyles();

  const { ref, inView, entry } = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 1,
  });

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      // alignItems="stretch"
      spacing={2}
    >
      {/* !! makes a variable into a boolean */}
      {!!images.length &&
        images.map((image, index) => {
          return (
            <Zoom ref={ref} in={inView} timeout={1000} key={image.id}>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                className={classes.grid}
              >
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
                <Card
                  className={classes.container}
                  style={{ borderRadius: 0, height: "100%" }}
                  raised
                >
                  <CardMedia image={image.url} style={{ height: 250 }} />
                </Card>
              </Grid>
            </Zoom>
          );
        })}
    </Grid>
  );
};

export default ImageGrid;

// <LazyLoadImage
//   className={classes.image}
//   alt="gallery image"
//   height={"100%"}
//   effect="blur"
//   placeholder={<CircularProgress color="primary" />}
//   src={image.url} // use normal <img> attributes as props
//   // width={"100%"}
// />
