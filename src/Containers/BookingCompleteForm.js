import { Grid, Paper, Typography, Slide } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import React, { useEffect } from "react";
import Paragraph from "../Components/Paragraph";

const BookingRequestComplete = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => history.push("/request-booking"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} align="center">
        <Slide in timeout={1500} direction="up">
          <Paper style={{ padding: 25 }}>
            <Typography style={{ marginBottom: 15 }} variant="h5">
              Your request has been submitted!
            </Typography>
            <Paragraph>
              Hand tight, we will contact you to follow up on your request
              within 24hours.
            </Paragraph>
          </Paper>
        </Slide>
      </Grid>
    </Grid>
  );
};

export default BookingRequestComplete;
