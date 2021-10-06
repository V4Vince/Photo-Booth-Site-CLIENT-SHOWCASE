// import './App.css';
import { makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    // padding: 15,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  text: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 600,
  },
}));

function PackageCard({
  title,
  price,
  info,
  lineItems,
  deleteButton,
  handleSelect,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={5}>
      <CardContent>
        <span style={{ float: "right" }}>{deleteButton}</span>
        <Typography variant="h6">{title}</Typography>
        <Typography className={classes.text} variant="h4" align="center">
          ${price}
        </Typography>

        {lineItems &&
          lineItems.map((item, index) => (
            <p key={index}>• {item.description}</p>
          ))}
      </CardContent>

      <CardContent>
        <Button
          color="secondary"
          variant="contained"
          style={{ display: "block", margin: "auto" }}
          className={classes.text}
          onClick={handleSelect}
        >
          Book Package
        </Button>
      </CardContent>
    </Card>
  );
}

export default PackageCard;
