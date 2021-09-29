import { useState, useEffect, useContext } from "react";

import { Typography, Button, IconButton, Grid } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import PackageForm from "./CreatePackageForm";
import PackageCard from "./PackageCards";

import { PackagePageContext, SiteContext } from "../Context/SiteContext";

import { createPackage, deletePackage, getPricingPackages } from "../api";

const EditPackagePricing = ({ submitForm }) => {
  // const [packages, setPackages] = useState([]);
  const [packagePage, packages] = useContext(PackagePageContext);
  const [loadStateData] = useContext(SiteContext);

  const [showPackageForm, setShowPackageForm] = useState(false);

  const cancelForm = () => setShowPackageForm(false);

  const handleDeletePackage = (id) => {
    deletePackage(id)
      .then((payload) => loadStateData("DELETE_PACKAGE", payload))
      .then(() => loadStateData("SUCCESS", "Deleted!"))
      .catch((err) => loadStateData("ERROR", "Error deleting"));
  };

  const submitNewPackage = (formData) => {
    createPackage(formData)
      .then((payload) => loadStateData("CREATE_PACKAGE", payload))
      .then(() => setShowPackageForm(false))
      .then(() => loadStateData("SUCCESS", "Created new package!"))
      .catch((err) => loadStateData("ERROR", "Error creating new package"));
  };

  useEffect(() => {
    if (!packages.length) {
      getPricingPackages()
        .then((data) => loadStateData("PACKAGES", data))
        .catch((error) => console.log("ERROR"));
    }
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <span style={{ float: "right" }}>
            {showPackageForm ? (
              <Button
                variant="contained"
                color="danger"
                onClick={() => setShowPackageForm(false)}
              >
                Cancel
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => setShowPackageForm(true)}
              >
                Package
              </Button>
            )}
          </span>
          <Typography variant="h5" style={{ marginBottom: 15 }}>
            Pricing Section
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          {showPackageForm && (
            <PackageForm
              cancelForm={cancelForm}
              submitNewPackage={submitNewPackage}
            />
          )}
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        {packagePage &&
          packages.map((packageData, index) => (
            <Grid item xs={12} md={4} key={index}>
              <PackageCard
                deleteButton={
                  <IconButton
                    aria-label="delete"
                    style={{ color: "red" }}
                    onClick={() => handleDeletePackage(packageData.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                }
                price={packageData.price}
                title={packageData.title}
                lineItems={packageData.line_items}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default EditPackagePricing;
