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

const CreatePackageForm = ({ cancelForm, submitNewPackage }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [popular, setPopular] = useState();
  const [lineItems, setLineItems] = useState([{ description: "" }]);

  const classes = useStyles();

  const handleImageSubmit = () => {};

  const submitForm = () => {
    const formData = {
      title,
      price,
      popular,
      line_items_attributes: lineItems,
    };

    submitNewPackage(formData);
  };

  const handleLineItemOnChange = (e, index) => {
    const allLineItems = [...lineItems];

    allLineItems[index]["description"] = e.target.value;

    setLineItems(allLineItems);
  };

  const handleRemoveLineItem = (index) => {
    const allLineItems = [...lineItems];
    allLineItems.splice(index, 1);
    setLineItems(allLineItems);
  };

  return (
    <Card>
      <CardContent>
        {/*  <span style={{ float: "right" }}>
          <Button onClick={() => setPopular(!popular)}>
            {popular ? (
              <FavoriteBorderOutlinedIcon />
            ) : (
              <FavoriteOutlinedIcon />
            )}
          </Button>
        </span>
        */}
        <Typography variant="h6" style={{ marginBottom: 15 }}>
          New Package
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>

          {lineItems.map((item, index) => {
            return (
              <Fragment key={index}>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    className={classes.bottomMargin}
                    name="description"
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleLineItemOnChange(e, index)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={(e) => handleRemoveLineItem(index)}>
                    x
                  </Button>
                </Grid>
              </Fragment>
            );
          })}
          <Grid item>
            <Button
              onClick={() => setLineItems([...lineItems, { description: "" }])}
            >
              + Add Feature
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions right>
        <Button
          fullWidth
          size="large"
          disabled={!title || !price}
          onClick={submitForm}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreatePackageForm;
