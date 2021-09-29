import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { CircularProgress, Grid, IconButton, Zoom } from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ImageGrid = ({ images, handleDelete }) => {
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
            <Grid item xs={12} md={4} key={index}>
              <Zoom in timeout={index * 2 + 1000} key={index}>
                <span>
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
                  <LazyLoadImage
                    alt="gallery image"
                    height={"100%"}
                    effect="blur"
                    placeholder={<CircularProgress color="primary" />}
                    src={image.url} // use normal <img> attributes as props
                    width={"100%"}
                  />
                </span>
              </Zoom>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default ImageGrid;
