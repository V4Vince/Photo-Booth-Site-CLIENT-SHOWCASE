import React, { useEffect, Fragment, useState } from "react";
import { useLocation } from "react-router-dom";

import DateFnsUtils from "@date-io/date-fns";

import {
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  makeStyles,
  Divider,
  Button,
  CardActions,
} from "@material-ui/core";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import PackageCard from "./PackageCards";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    display: "flex",
    justifyContent: "center",
  },
  gridContainer: {
    padding: 15,
  },

  selectedPackage: {
    backgroundColor: theme.palette.primary.main,
  },
  selectedPackageButtonContainer: {
    "& > *": {
      marginTop: 15,
      marginBottom: 15,
    },
  },
}));

const BookingForm = ({
  packages,
  submitBookingRequest,
  defaultSelectedPackage,
}) => {
  const classes = useStyles();
  const location = useLocation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [date, setDate] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectedPackage, setSelectedPackage] = useState({});

  useEffect(() => {
    if (location.state) {
      setSelectedPackage(location.state.selectedPackage);
    }
  }, []);

  const renderPackageCards = () => {
    return packages.map((packageData, index) => (
      <Grid key={index} item xs={12} md={4}>
        <PackageCard
          // price={packageData.price}
          // title={packageData.title}
          // lineItems={packageData.line_items}
          packageData={packageData}
          handleSelect={() => setSelectedPackage({ ...packageData })}
        />
      </Grid>
    ));
  };

  const checkForFormErrors = () => {
    let formErrors = [];
    if (firstName === "") {
      formErrors.push("firstName");
    }
    if (lastName === "") {
      formErrors.push("lastName");
    }
    if (email === "") {
      formErrors.push("email");
    }
    if (!selectedPackage) {
      formErrors.push("selectedPackage");
    }

    // return setErrors(formErrors);
    return formErrors;
  };

  const handleFormSubmit = () => {
    const formData = {
      first_name: firstName,
      last_name: lastName,
      event_date: date,
      phone,
      email,
      package_name: selectedPackage.title,
      package_price: selectedPackage.price,
      package_id: selectedPackage.id,
      event_type: eventType,
    };
    submitBookingRequest(formData);
  };

  const resetSelection = () => setSelectedPackage(null);

  const handleCustomPackageClick = () =>
    setSelectedPackage({ title: "Custom Package", price: "TBD" });

  const renderSelectedPackage = () => {
    return (
      <Fragment>
        <Grid item xs={12} md={6} className={classes.selectedPackage}>
          <PackageCard packageData={selectedPackage} />
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.selectedPackageButtonContainer}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              color="primary"
              onClick={resetSelection}
            >
              Change Package
            </Button>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              color="primary"
              onClick={handleCustomPackageClick}
            >
              Request Custom Package
            </Button>
          </div>
        </Grid>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" color="primary">
            Contact Info
          </Typography>

          <Grid
            container
            spacing={5}
            className={classes.gridContainer}
            justifyContent="center"
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                value={firstName}
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                  checkForFormErrors();
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={lastName}
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                  checkForFormErrors();
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  checkForFormErrors();
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Type"
                placeholder="Tell us what kind of event this is"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider style={{ marginTop: 15 }} />
        <CardContent>
          <Typography variant="h5" color="primary">
            Booking Details
          </Typography>
          <Grid
            container
            spacing={5}
            justifyContent="center"
            className={classes.gridContainer}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Select Event Date</Typography>
                <DatePicker
                  className={classes.calendar}
                  autoOk
                  disablePast
                  disableToolbar
                  // orientation="landscape"
                  variant="static"
                  openTo="date"
                  value={date}
                  onChange={(date) => setDate(date)}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <Grid item xs={12}>
              <Typography variant="subtitle2">Select Package</Typography>

              <Grid container spacing={1}>
                {selectedPackage
                  ? renderSelectedPackage()
                  : renderPackageCards()}
              </Grid>
            </Grid>

            {!selectedPackage && (
              <Button
                variant="outlined"
                fullWidth
                color="primary"
                onClick={handleCustomPackageClick}
              >
                Request Custom Package
              </Button>
            )}
          </Grid>
        </CardContent>
        <CardActions style={{ marginTop: 25 }}>
          <Button
            onClick={handleFormSubmit}
            color="secondary"
            variant="contained"
            size="large"
            fullWidth
            disabled={!!checkForFormErrors().length}
          >
            Submit Booking Request
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};
export default BookingForm;
