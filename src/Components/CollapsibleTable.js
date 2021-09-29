import React, { Fragment, useState } from "react";

import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Collapse,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Hidden,
} from "@material-ui/core";

import {
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
} from "@material-ui/icons";

import { format } from "date-fns";

const CollapsibleTable = ({
  bookingInquiries,
  handleAcceptBooking,
  handleRemoveInquiry,
}) => {
  const [showData, setShowData] = useState(null);
  const columns = [
    { field: "expand", headerName: "" },
    { field: "name", headerName: "Name" },
    { field: "event_date", headerName: "Event Date" },
    { field: "package_name", headerName: "Package" },
  ];

  const renderHeaders = () =>
    columns.map((el, index) => (
      <TableCell key={index}>{el.headerName}</TableCell>
    ));

  const renderDataCells = () =>
    bookingInquiries.map((inquiry) => (
      <Fragment key={inquiry.id}>
        <TableRow
          key={inquiry.id}
          hover
          onClick={() => setShowData(inquiry.id)}
        >
          <TableCell>
            {showData === inquiry.id ? (
              <KeyboardArrowUpSharp />
            ) : (
              <KeyboardArrowDownSharp />
            )}
          </TableCell>
          <TableCell>
            {inquiry.first_name} {inquiry.last_name}
          </TableCell>
          <TableCell>
            {format(new Date(inquiry.event_date), "MMM dd, yyyy")}
          </TableCell>
          <TableCell>{inquiry.package_name}</TableCell>
        </TableRow>
        <TableRow style={{ backgroundColor: "#f5f5f5" }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={showData === inquiry.id} timeout={1000}>
              <Box>
                <Typography
                  style={{ marginTop: 15, marginBottom: 25 }}
                  variant="subtitle2"
                >
                  <span style={{ float: "right" }}>
                    Submitted:
                    {format(new Date(inquiry.created_at), "MMMM dd, yyyy")}
                  </span>
                  Details
                </Typography>

                {renderNestedTable(inquiry)}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    ));

  const renderNestedTable = ({
    id,
    first_name,
    last_name,
    phone,
    email,
    package_name,
    package_price,
    event_date,
    booked,
    remove,
    event_type,
  }) => (
    <Grid container spacing={1} style={{ marginBottom: 15 }}>
      <Grid item xs={12} sm={4}>
        <Typography variant="overline">Contact Info</Typography>
        <Typography variant="subtitle1">
          {first_name} {last_name}
        </Typography>
        <Typography variant="body1">{phone}</Typography>
        <Typography variant="body1">{email}</Typography>
      </Grid>

      <Hidden xsDown>
        <Grid item sm={1} align="center">
          <Divider orientation="vertical" />
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12} align="center">
          <Divider orientation="horizontal" />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={4}>
        <Typography variant="overline">Booking Info</Typography>
        <Typography vairant="subtitle1">
          {package_name} - ${package_price}
        </Typography>
        <Typography variant="body1">
          {format(new Date(event_date), "MMMM dd, yyyy")}
        </Typography>
        <Typography variant="body1">{event_type}</Typography>
      </Grid>

      <Hidden smUp>
        <Grid item xs={12} align="center">
          <Divider orientation="horizontal" />
        </Grid>
      </Hidden>

      <Grid item xs={12} sm={2}>
        <Grid item xs={12}>
          <Button
            variant="text"
            fullWidth
            onClick={() => handleRemoveInquiry(id)}
            style={{ color: "red" }}
          >
            Remove
          </Button>
        </Grid>

        <Grid item xs={12}>
          {!booked && (
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={() => handleAcceptBooking(id)}
            >
              Book
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );

  const rows = bookingInquiries;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>{renderHeaders()}</TableRow>
          </TableHead>
          <TableBody>{renderDataCells()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CollapsibleTable;
