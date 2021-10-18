import { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";

const useStyles = makeStyles({
  bottomMargin: {
    marginBottom: 15,
  },
});

const CreatePackageForm = ({
  cancelForm,
  submitNewPackage,
  packageData,
  closeForm,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [popular, setPopular] = useState();
  const [existingLineItems, setExistingLineItems] = useState([]);
  const [lineItems, setLineItems] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (packageData) {
      setTitle(packageData.title);
      setPrice(packageData.price);
      setExistingLineItems(packageData.line_items);
    }
  }, [packageData]);

  const handleImageSubmit = () => {};

  const submitForm = () => {
    let packageId = null;
    if (packageData) {
      packageId = packageData.id;
    }

    const formData = {
      id: packageId,
      title,
      price,
      popular,
      line_items_attributes: [...existingLineItems, ...lineItems],
    };

    submitNewPackage(formData);
    // closeForm();
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

  const handleExistingLineItemOnChange = (e, index) => {
    const allExisting = [...existingLineItems];
    allExisting[index]["description"] = e.target.value;
    setExistingLineItems(allExisting);
  };

  const markExistingLineItemForDelete = (item, index) => {
    const itemToBeDeleted = { ...item, _destroy: "1" };
    const allExisting = [...existingLineItems];
    allExisting[index] = itemToBeDeleted;
    setExistingLineItems(allExisting);
  };

  const undoMarkExistingLineItemForDelete = (item, index) => {
    const markedItem = { ...item, _destroy: null };
    const allExisting = [...existingLineItems];
    allExisting[index] = markedItem;
    setExistingLineItems(allExisting);
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

          {existingLineItems.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    id={item.id}
                    disabled={item._destroy}
                    // className={classes.bottomMargin}
                    name="description"
                    value={item.description}
                    onChange={(e) => handleExistingLineItemOnChange(e, index)}
                  />
                  {item._destroy && (
                    <FormHelperText
                      style={{ color: "red" }}
                      danger
                      id={item.id}
                    >
                      This will be deleted
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={2}>
                  {item._destroy ? (
                    <IconButton
                      aria-label="restore"
                      onClick={(e) =>
                        undoMarkExistingLineItemForDelete(item, index)
                      }
                    >
                      <RestoreIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={(e) =>
                        markExistingLineItemForDelete(item, index)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Grid>
              </Fragment>
            );
          })}

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
