// import './App.css';
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    padding: "25px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.fonts.white,
    // position: "absolute",
    // bottom: 0,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={12}>
        <Typography
          align="center"
          variant="body1"
          component={Link}
          to="/admin"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "default",
          }}
        >
          <span>&copy;</span> Dang Its a Photobooth · 2021
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
