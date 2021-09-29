import { NavLink, Link } from "react-router-dom";

import { Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "transparent",
      fontWeight: 600,
    },
    marginRight: theme.spacing(2),
  },
  menuButtonActive: {
    color: theme.palette.secondary.main,
  },
}));

const NavBarButton = (props) => {
  const classes = useStyles();
  if (props.variant === "contained") {
    return (
      <Button disableRipple color="secondary" {...props} component={NavLink}>
        {props.title}
      </Button>
    );
  }

  return (
    <Button
      disableRipple
      className={classes.menuButton}
      color="secondary"
      {...props}
      component={NavLink}
      activeClassName={classes.menuButtonActive}
    >
      {props.title}
    </Button>
  );
};

export default NavBarButton;
