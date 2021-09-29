import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  coloredBackground: {
    ...theme.palette.grayGradient,
    // width: "100%",
    // paddingTop: "50px",
    // paddingBottom: "100px",
    "& > div > p": {
      color: "white",
    },
    "& > div p:nth-child(2)": {
      color: "white",
    },
  },
}));

const VerticalSpacer = ({ showBackgroundColor, top, bottom, children }) => {
  const classes = useStyles();

  const styles = {
    root: {
      paddingTop: !!top ? top : 25,
      paddingBottom: !!bottom ? bottom : 25,
    },
  };

  return (
    <div
      style={styles.root}
      className={showBackgroundColor && classes.coloredBackground}
    >
      {children}
    </div>
  );
};

export default VerticalSpacer;
