import { Fragment, useState, useRef } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
  Checkbox,
  InputLabel,
} from "@material-ui/core";

const TemplateForm = ({ handleCreateTemplate, closeForm }) => {
  const fileInputRef = useRef();

  const [image, setImage] = useState();
  const [imageSize, setImageSize] = useState();
  const [imageName, setImageName] = useState();
  const [frontPage, setFrontPage] = useState(false);

  const validate = () => {
    let isFormValid = [];

    if (!image) {
      isFormValid.push("image");
    }
    if (!imageSize) {
      isFormValid.push("imageSize");
    }

    return isFormValid.length;
  };

  const handleSubmit = () => {
    let formData = new FormData();

    const templateForm = {
      name: imageName,
      sizing: imageSize,
      front_page: frontPage,
      image: image,
    };

    Object.keys(templateForm).forEach((key) =>
      formData.append(`template[${key}]`, templateForm[key])
    );

    handleCreateTemplate(formData);
  };

  return (
    <Fragment>
      <span style={{ float: "right" }}>
        <Button variant="outlined" color="primary" onClick={closeForm}>
          Cancel
        </Button>
      </span>
      <Typography variant="h5" style={{ marginBottom: 15 }}>
        New Template Form
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardHeader>New Template</CardHeader>
            <CardContent>
              <Grid container spacing={5} justifyContent="center">
                <Grid
                  item
                  xs={12}
                  sm={5}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    // alignItems: "space-around",
                    // alignContent: "space-around",
                  }}
                >
                  {!image ? (
                    <Button
                      onClick={() => fileInputRef.current.click()}
                      variant="contained"
                      color="secondary"
                    >
                      Choose File
                    </Button>
                  ) : (
                    <Fragment>
                      <TextField
                        disabled={true}
                        value={image.name}
                        label="Filename"
                        fullWidth
                      />
                      <Button
                        onClick={() => fileInputRef.current.click()}
                        variant="contained"
                        color="secondary"
                      >
                        Change Image
                      </Button>
                    </Fragment>
                  )}

                  <input
                    label="Image"
                    type="file"
                    accept="image/jpeg"
                    name="pic"
                    hidden={true}
                    ref={fileInputRef}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">Template Details</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        label="Template Name"
                        value={imageName}
                        onChange={(e) => setImageName(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Template size"
                        value={imageSize}
                        onChange={(e) => setImageSize(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <InputLabel variant="standard" align="center">
                          Front Page
                        </InputLabel>
                        <Checkbox
                          color="primary"
                          onChange={(e) => setFrontPage(e.target.checked)}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                disabled={!!validate()}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default TemplateForm;
