// import * as ActiveStorage from "@rails/activestorage";

import { useState, useEffect, useContext } from "react";

import { GalleryPageContext, SiteContext } from "../Context/SiteContext";

import {
  TextField,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";

import UploadGalleryImages from "./UploadGalleryImages";
import ImageGrid from "./ImageGrid";

import {
  getGalleryPage,
  uploadGalleryImages,
  updateGalleryPage,
  deleteGalleryImage,
  deleteAllGalleryImages,
} from "../api";
import Paragraph from "./Paragraph";

const EditGalleryPageForm = ({ submitForm }) => {
  const [galleryPage, galleryImages] = useContext(GalleryPageContext);
  const [loadStateData] = useContext(SiteContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleImageSubmit = (form) => {
    let data = new FormData();

    for (var i = 0; i < form.length; i++) {
      data.append("gallery[gallery_pics][]", form[i]);
    }
    uploadGalleryImages(data)
      .then((payload) => loadStateData("CREATE_GALLERY_IMAGES", payload))
      .then(() => loadStateData("SUCCESS", "Uploading success!"))
      .catch((err) => loadStateData("ERROR", "Error uploading"));
  };

  const handleGalleryUpdate = () => {
    let data = {
      title,
      body,
    };

    updateGalleryPage(data)
      .then((payload) => loadStateData("GALLERY_PAGE", payload))
      .then(() => loadStateData("SUCCESS", "Updated Gallery Page!"))
      .catch((err) => loadStateData("ERROR", "Error updating Gallery Page"));
  };

  const handleImageDelete = (id) => {
    deleteGalleryImage(id)
      .then((response) => loadStateData("DELETE_GALLERY_IMAGE", response))
      .then(() => loadStateData("SUCCESS", "Deleted an image!"))
      .catch((err) => loadStateData("ERROR", "Error deleting image"));
  };

  const deleteAllImages = () => {
    deleteAllGalleryImages()
      .then(() => loadStateData("DELETE_ALL_GALLERY_IMAGES"))
      .then(() => loadStateData("SUCCESS", "Deleted all images!"))
      .catch((err) => loadStateData("ERROR", "Error deleting all images"));
  };

  useEffect(() => {
    if (!galleryPage) {
      getGalleryPage()
        .then((payload) => {
          loadStateData("GALLERY_PAGE", payload);
          return payload;
        })
        .then((payload) => {
          setTitle(payload.title);
          setBody(payload.body);
        })
        .catch((err) => alert("unable to load about page data"));
    } else {
      setTitle(galleryPage.title);
      setBody(galleryPage.body);
      // setImage({ imageUrl: aboutPage.url });
    }
  }, []);

  if (!galleryPage) {
    return null;
  }

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: 15 }}>
        Gallery Section
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                fullWidth
                multiline
                maxRows={10}
                label="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </CardContent>

            <CardActions>
              <Button onClick={handleGalleryUpdate} fullWidth size="large">
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <UploadGalleryImages upload={handleImageSubmit} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" align="center" style={{ margin: 15 }}>
            Current Images
          </Typography>
          {!galleryImages.length && (
            <Paragraph>You currently do not have any images posted.</Paragraph>
          )}
          <ImageGrid images={galleryImages} handleDelete={handleImageDelete} />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            disabled={!galleryImages.length}
            onClick={deleteAllImages}
            style={{ color: "white", backgroundColor: "red" }}
          >
            Delete All Images
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditGalleryPageForm;
