import React, { useEffect, useContext, useState } from "react";
import { BookingInquiries, SiteContext } from "../Context/SiteContext";

import { getBookingInquiries, acceptBooking, removeBooking } from "../api";
import { Button, Typography } from "@material-ui/core";
import CollapsibleTable from "../Components/CollapsibleTable";

const BookingInquiriesPage = () => {
  const [bookingInquiries] = useContext(BookingInquiries);
  const [loadStateData] = useContext(SiteContext);

  const [sortCritera, setSortCritera] = useState("");

  useEffect(() => {
    getBookingInquiries(sortCritera)
      .then((payload) => loadStateData("BOOKING_INQUIRIES", payload))
      .catch((err) => console.log("ERROR LAODING BOOKINGS"));
  }, [sortCritera]);

  const handleAcceptBooking = (id) => {
    acceptBooking(id)
      .then((payload) => loadStateData("ACCEPT_BOOKING", payload))
      .then(() => loadStateData("SUCCESS", "Booking accepted!"))
      .catch((err) => loadStateData("ERROR", "Error acceptoing booking"));
  };

  const handleRemoveInquiry = (id) => {
    removeBooking(id)
      .then((payload) => loadStateData("ACCEPT_BOOKING", payload))
      .then(() => loadStateData("SUCCESS", "Booking removed!"))
      .catch((err) => loadStateData("ERROR", "Error removing booking"));
  };

  return (
    <div>
      <Typography variant="h4">Booking Inquiries</Typography>
      <div style={{ marginBottom: 15, marginTop: 15 }}>
        <span style={{ marginLeft: 5, marginRight: 5 }}>SORT BY</span>
        <Button
          variant={sortCritera === "event_date" ? "outlined" : "text"}
          color="primary"
          onClick={() => setSortCritera("event_date")}
        >
          Event Date
        </Button>
        <Button
          variant={sortCritera === "" ? "outlined" : "text"}
          color="primary"
          onClick={() => setSortCritera("")}
        >
          Request Date
        </Button>
      </div>

      <CollapsibleTable
        bookingInquiries={bookingInquiries}
        handleAcceptBooking={handleAcceptBooking}
        handleRemoveInquiry={handleRemoveInquiry}
      />
    </div>
  );
};

export default BookingInquiriesPage;
