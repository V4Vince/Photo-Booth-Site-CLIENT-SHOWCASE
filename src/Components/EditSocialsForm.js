import { Fragment, useState } from "react";
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

const useStyles = makeStyles({
  bottomMargin: {
    marginBottom: 15,
  },
});

const EditSocialsForm = ({ updateSocialLinks, instagram, facebook }) => {
  const [instagramLink, setInstagramLink] = useState(instagram);
  const [facebookLink, setFacebookLink] = useState(facebook);

  const classes = useStyles();

  const submitForm = () => {
    const updatedLinks = {
      facebook_link: facebookLink,
      instagram_link: instagramLink,
    };

    updateSocialLinks(updatedLinks);
  };

  return (
    <Fragment>
      <Typography variant="h5" className={classes.bottomMargin}>
        Socials Section
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6" className={classes.bottomMargin}>
                Instagram
              </Typography>
              <TextField
                className={classes.bottomMargin}
                fullWidth
                label="Instagram Name"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button onClick={submitForm} fullWidth size="large">
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6" className={classes.bottomMargin}>
                Facebook
              </Typography>
              <TextField
                className={classes.bottomMargin}
                fullWidth
                label="Facebook Name"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button fullWidth onClick={submitForm} size="large">
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditSocialsForm;
