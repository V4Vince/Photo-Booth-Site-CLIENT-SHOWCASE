import { Fragment, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AboutPageContext, SiteContext } from "../Context/SiteContext";

import {
  TextField,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";

import VerticalSpacer from "./VerticalSpacer";

import EditSocialsForm from "./EditSocialsForm";

import { getAboutPage, updateAboutPage, uploadAboutPageImage } from "../api";

const useStyles = makeStyles({
  root: {
    // margin: "0 auto",
    // display: "flex",
    // flexWrap: "wrap",
    // justifyContent: "space-evenly",
    // flexGrow: 1,
    // flex: 1,
    // alignItems: "stretch",
  },
  card: {
    height: "95%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    margin: 5,
  },
  grid: {
    margin: 5,
  },
  bottomMargin: {
    marginBottom: 15,
  },
  formContainer: {
    margin: 10,
  },
});

const EditAboutPageForm = ({ submitForm }) => {
  const [aboutPage] = useContext(AboutPageContext);
  const [loadStateData] = useContext(SiteContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState({ imgUrl: "", fileData: "" });

  const classes = useStyles();

  const handleImageSubmit = () => {
    const updatedImage = {
      pic: image.fileData,
    };

    let data = new FormData();
    Object.keys(updatedImage).forEach((key) =>
      data.append(`about_page[${key}]`, updatedImage[key])
    );

    uploadAboutPageImage(data)
      .then((payload) => loadStateData("ABOUT_PAGE", payload))
      .then(() => loadStateData("SUCCESS", "Upload success"))
      .catch((err) => loadStateData("ERROR", "Error Uploading"));
  };

  const updateSocialLinks = (data) => {
    updateAboutPage(data)
      .then((payload) => loadStateData("ABOUT_PAGE", payload))
      .then(() => loadStateData("SUCCESS", "Updated Social Media Links"))
      .catch((err) =>
        loadStateData("ERROR", "Error updating Social Media Links")
      );
  };

  const handleAboutPageSubmit = () => {
    const data = {
      title,
      body,
    };

    updateAboutPage(data)
      .then((payload) => loadStateData("ABOUT_PAGE", payload))
      .then(() => loadStateData("SUCCESS", "Updated About Section"))
      .catch((err) => loadStateData("ERROR", "Error updating About Section"));
  };

  useEffect(() => {
    if (!aboutPage) {
      getAboutPage()
        .then((payload) => {
          loadStateData("ABOUT_PAGE", payload);
          return payload;
        })
        .then((payload) => {
          setTitle(payload.title);
          setBody(payload.body);
          setImage({ imageUrl: payload.url });
        })
        .catch((err) => alert("unable to load about page data"));
    } else {
      setTitle(aboutPage.title);
      setBody(aboutPage.body);
      setImage({ imageUrl: aboutPage.url });
    }
  }, []);

  if (!aboutPage) {
    return null;
  }

  return (
    <Fragment>
      <VerticalSpacer>
        <EditSocialsForm
          facebook={aboutPage.facebook_link}
          instagram={aboutPage.instagram_link}
          updateSocialLinks={updateSocialLinks}
        />
      </VerticalSpacer>
      <Typography variant="h5" style={{ marginBottom: 15 }}>
        About Section
      </Typography>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Card className={classes.card}>
            <CardContent>
              <TextField
                className={classes.bottomMargin}
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                className={classes.bottomMargin}
                fullWidth
                multiline
                maxRows={10}
                label="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </CardContent>

            <CardActions>
              <Button onClick={handleAboutPageSubmit} fullWidth size="large">
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <img
                src={
                  image.fileData
                    ? URL.createObjectURL(image.fileData)
                    : image.imageUrl
                }
                style={{ width: "100%" }}
              />
              <TextField
                className={classes.bottomMargin}
                label="Image"
                type="file"
                accept="image/jpeg"
                name="pic"
                onChange={(e) => setImage({ fileData: e.target.files[0] })}
              />
            </CardContent>

            <CardActions>
              <Button onClick={handleImageSubmit} fullWidth size="large">
                Upload
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditAboutPageForm;
