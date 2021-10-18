// import './App.css';
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import CreatePackageForm from "./CreatePackageForm";

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
  packageData,
  deleteButton,
  isEditable,
  handleSelect,
  handleEditSubmit,
}) {
  const classes = useStyles();

  const [showEditForm, setShowEditForm] = useState(false);

  //close form after packagedata has been updated
  useEffect(() => {
    setShowEditForm(false);
  }, [packageData]);

  const editButton = (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      onClick={() => setShowEditForm(true)}
    >
      Edit
    </Button>
  );

  if (showEditForm) {
    return (
      <CreatePackageForm
        packageData={packageData}
        submitNewPackage={handleEditSubmit}
        closeForm={() => setShowEditForm(false)}
      />
    );
  }

  return (
    <Card className={classes.card} elevation={5}>
      <CardContent>
        <span style={{ float: "right" }}>{deleteButton}</span>
        <Typography variant="h6">{packageData.title}</Typography>
        <Typography className={classes.text} variant="h4" align="center">
          ${packageData.price}
        </Typography>

        {packageData.line_items &&
          packageData.line_items.map((item, index) => (
            <p key={index}>• {item.description}</p>
          ))}
      </CardContent>

      <CardContent>
        {isEditable ? (
          editButton
        ) : (
          <Button
            color="secondary"
            variant="contained"
            style={{ display: "block", margin: "auto" }}
            className={classes.text}
            onClick={handleSelect}
          >
            Book Package
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default PackageCard;
