import React, { useState, Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Hidden } from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import FAB from "./FAB";

import NavBarButton from "./NavButton";

import { AuthContext } from "../Context/AuthContext";

const routes = [
  {
    name: "About Us",
    route: "/about",
    icon: "",
    isButton: false,
  },
  {
    name: "Pricing",
    route: "/pricing",
    icon: "",
    isButton: false,
  },
  {
    name: "Gallery",
    route: "/gallery",
    icon: "",
    isButton: false,
  },
  {
    name: "Templates",
    route: "/templates",
    icon: "",
    isButton: false,
  },
  {
    name: "All Templates",
    route: "/all-templates",
    icon: "",
    isButton: false,
  },
  {
    name: "Request Booking",
    route: "/request-booking",
    icon: "",
    isButton: true,
  },
];

const adminRoutes = [
  {
    name: "Edit About",
    route: "/admin/edit-about",
    icon: "",
    isButton: false,
  },
  {
    name: "Edit Pricing",
    route: "/admin/edit-pricing",
    icon: "",
    isButton: false,
  },
  {
    name: "Edit Gallery",
    route: "/admin/edit-gallery",
    icon: "",
    isButton: false,
  },
  {
    name: "Edit Templates",
    route: "/admin/edit-templates",
    icon: "",
    isButton: false,
  },
  {
    name: "Inquires",
    route: "/admin/booking-inquiries",
    icon: "",
    isButton: true,
  },
  {
    name: "Booked Events",
    route: "/admin/booked-events",
    icon: "",
    isButton: true,
  },
];

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 250,
    flex: 1,
    ...theme.palette.grayGradient,
  },
  adminControls: {},
}));

const TemporaryDrawer = () => {
  const classes = useStyles();
  const [navDrawer, setNavDrawer] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [auth] = useContext(AuthContext);

  const history = useHistory();

  const toggleNavDrawer = () => setNavDrawer(!navDrawer);

  const userLinks = (
    <Fragment>
      {routes.map(({ name, route, isButton }) => {
        if (!isButton) {
          return (
            <ListItem key={name}>
              <NavBarButton to={route} title={name} />
            </ListItem>
          );
        } else {
          return (
            <Fragment key={name}>
              <Divider style={{ marginBottom: 2 }} />
              <ListItem>
                <NavBarButton variant="contained" to={route} title={name} />
              </ListItem>
            </Fragment>
          );
        }
      })}
    </Fragment>
  );

  const adminLinks = (
    <Fragment>
      <ListSubheader>Admin Controls</ListSubheader>
      <Divider />
      {adminRoutes.map(({ name, route, isButton }) => {
        if (!isButton) {
          return (
            <ListItem key={name}>
              <NavBarButton to={route} title={name} />
            </ListItem>
          );
        } else {
          return (
            <Fragment key={name}>
              <ListItem>
                <NavBarButton
                  fullWidth
                  variant="contained"
                  to={route}
                  title={name}
                />
              </ListItem>
            </Fragment>
          );
        }
      })}
    </Fragment>
  );

  const adminOrSiteButton = (
    <Button
      color="primary"
      fullWidth
      variant="contained"
      style={{ borderRadius: 0, paddingTop: 15, paddingBottom: 15 }}
      onClick={() => setShowAdmin(!showAdmin)}
    >
      {showAdmin ? "Show Site" : "Show Admin"}
    </Button>
  );

  return (
    <Fragment key="right">
      <Hidden mdUp>
        <MenuIcon onClick={toggleNavDrawer} color="secondary" />
      </Hidden>
      <Drawer
        anchor="right"
        open={navDrawer}
        color="primary"
        onClose={toggleNavDrawer}
        // onClick={toggleNavDrawer}
      >
        <List
          onClick={toggleNavDrawer}
          className={classes.fullList}
          role="presentation"
        >
          {showAdmin ? adminLinks : userLinks}
        </List>
        {auth.isSignedIn && adminOrSiteButton}
      </Drawer>

      {auth.isSignedIn && <FAB handleClick={toggleNavDrawer} />}
    </Fragment>
  );
};

export default TemporaryDrawer;
