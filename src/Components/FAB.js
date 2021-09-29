import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 25,
      right: 15,
      zIndex: 99,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const FloatingActionButtons = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="secondary" aria-label="add" onClick={handleClick}>
        <EditIcon />
      </Fab>
    </div>
  );
};

export default FloatingActionButtons;
