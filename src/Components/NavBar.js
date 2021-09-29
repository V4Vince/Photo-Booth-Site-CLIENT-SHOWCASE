import { Fragment } from "react";

import { AppBar, Toolbar, Hidden, Container } from "@material-ui/core";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import SidePanelNav from "./SidePanelNav";

import NavBarButton from "./NavButton";

import logo from "../Logo.png";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    // color: "red",
  },
  navbar: {
    // marginBottom: 50,
    ...theme.palette.grayGradient,
  },
}));

const NavBar = ({ handleScrollTransition }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <AppBar className={classes.navbar} elevation={5} position="fixed">
      <Container maxWidth="md">
        <Toolbar id="navbar-color">
          <Hidden smDown>
            <div className={classes.title}>
              <img
                style={{ height: "50px", marginTop: 5 }}
                onClick={() => history.push("/")}
                src={logo}
              />
            </div>
          </Hidden>

          <Hidden mdUp>
            <div
              style={{
                flex: 1,
              }}
            >
              <img style={{ height: "50px", marginTop: 5 }} src={logo} />
            </div>
          </Hidden>

          <SidePanelNav />

          <Hidden smDown>
            {/* <Fragment>
            <NavBarButton
              title={<FacebookIcon />}
              to={{
                pathname: `https://facebook.com/${aboutPage.facebook_link}`,
              }}
              target="_blank"
            />
            <NavBarButton
              title={<InstagramIcon />}
              to={{
                pathname: `https://instagram.com/${aboutPage.instagram_link}`,
              }}
              target="_blank"
            />
          </Fragment> */}

            <NavBarButton title="Home" to="/about" />
            <NavBarButton title="Pricing" to="/pricing" />
            <NavBarButton
              title="Gallery"
              to="/gallery"
              // onClick={() => handleScrollTransition("gallery")}
            />
            <NavBarButton title="Templates" to="/templates" />

            <NavBarButton
              variant="contained"
              title="Request Booking"
              to="/request-booking"
            />
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
