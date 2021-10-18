import { Fragment, useState, useRef, useEffect } from "react";

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
  Box,
  Chip,
  CardMedia,
  CardActionArea,
  IconButton,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

const TemplateForm = ({
  isEditing,
  templateData,
  handleUpdateTemplate,
  handleCreateTemplate,
  closeForm,
}) => {
  const fileInputRef = useRef();

  const [image, setImage] = useState("");
  const [imageSize, setImageSize] = useState("");
  const [imageName, setImageName] = useState("");
  const [frontPage, setFrontPage] = useState(false);

  useEffect(() => {
    if (templateData) {
      // setImage(templateData.image_url);
      setImageName(templateData.name);
      setImageSize(templateData.sizing);
      setFrontPage(templateData.front_page);
    }
  }, []);

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
    };
    console.log("TEMPLATE BEFORE", templateForm);

    if (image) {
      templateForm["image"] = image;
    }

    console.log("TEMPLATE AFTER", templateForm);

    Object.keys(templateForm).forEach((key) =>
      formData.append(`template[${key}]`, templateForm[key])
    );

    return formData;
  };

  const renderEditForm = () => (
    <Card style={{ width: "100%" }}>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
          }}
        >
          <Fragment>
            <Button
              onClick={() => fileInputRef.current.click()}
              variant="contained"
              color="secondary"
            >
              Change Image
            </Button>
          </Fragment>
        </div>

        {templateData.front_page && (
          <Chip
            variant="default"
            color="secondary"
            label="Frontpage"
            style={{ position: "absolute", right: 5, top: 5 }}
          />
        )}
        <CardMedia image={templateData.image_url} style={{ height: 200 }} />
      </div>
      <CardContent>
        <input
          label="Image"
          type="file"
          accept="image/jpeg"
          name="pic"
          hidden={true}
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
        />

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

        <div
          style={{
            display: "flex",
            // flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InputLabel variant="standard" align="center">
            Front Page
          </InputLabel>
          <Checkbox
            color="primary"
            checked={frontPage}
            onChange={(e) => setFrontPage(!frontPage)}
          />
        </div>
      </CardContent>

      <CardActions style={{ justifyContent: "space-between" }}>
        <Button variant="outlined" color="primary" onClick={closeForm}>
          Cancel
        </Button>

        <Button
          variant="text"
          onClick={() => handleUpdateTemplate(handleSubmit())}
        >
          save
        </Button>
      </CardActions>
    </Card>
  );

  const renderNewForm = () => (
    <Fragment>
      <span style={{ float: "right" }}>
        <Button variant="outlined" color="primary" onClick={closeForm}>
          Cancel
        </Button>
      </span>
      <Card>
        <CardHeader>New Template</CardHeader>
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
        <CardActions>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            disabled={!!validate()}
            onClick={() => handleCreateTemplate(handleSubmit())}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {isEditing ? renderEditForm() : renderNewForm()}
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default TemplateForm;
