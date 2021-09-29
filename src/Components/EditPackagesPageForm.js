import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";

import EditPackagePricing from "./EditPackagePricing";

import { PackagePageContext, SiteContext } from "../Context/SiteContext";

import { getPackagePage, updatePackagePage } from "../api";
import VerticalSpacer from "./VerticalSpacer";

const useStyles = makeStyles({
  bottomMargin: {
    marginBottom: 15,
  },
});

const EditPackagesPageForm = ({ submitForm }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [packages, setPackages] = useState([]);
  const [packagePage] = useContext(PackagePageContext);
  const [loadStateData] = useContext(SiteContext);

  const classes = useStyles();

  // const handleImageSubmit = () => {};

  const handleSubmit = () => {
    const updatedData = {
      title,
      body,
    };
    updatePackagePage(updatedData)
      .then((payload) => loadStateData("PACKAGE_PRICING_PAGE", payload))
      .then(() => loadStateData("SUCCESS", "Updated Package Page!"))
      .catch((err) => loadStateData("ERROR", "Error updating package page"));
  };

  useEffect(() => {
    if (!packagePage) {
      getPackagePage()
        .then((payload) => {
          loadStateData("PACKAGE_PRICING_PAGE", payload);
          return payload;
        })
        .then((payload) => {
          setTitle(payload.title);
          setBody(payload.body);
        })
        .catch((error) => console.log("ERROR"));
    } else {
      setTitle(packagePage.title);
      setBody(packagePage.body);
    }
  }, []);

  if (!packagePage) {
    return null;
  }

  return (
    <div>
      <Typography variant="h5" className={classes.bottomMargin}>
        Packages Section
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
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
              <Button onClick={handleSubmit} fullWidth size="large">
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <VerticalSpacer>
        <EditPackagePricing />
      </VerticalSpacer>
    </div>
  );
};

export default EditPackagesPageForm;
