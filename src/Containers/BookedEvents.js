import React, { useEffect, useContext } from "react";
import { BookingInquiries, SiteContext } from "../Context/SiteContext";

import { getBookingInquiries, removeBooking } from "../api";
import { Typography } from "@material-ui/core";
import CollapsibleTable from "../Components/CollapsibleTable";

const BookedEvents = () => {
  const [bookingInquiries] = useContext(BookingInquiries);
  const [loadStateData] = useContext(SiteContext);

  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getBookingInquiries("booked")
      .then((payload) => loadStateData("BOOKING_INQUIRIES", payload))
      .catch((err) => console.log("ERROR LAODING BOOKINGS"));
  }, []);

  const handleRemoveInquiry = (id) => {
    removeBooking(id)
      .then((payload) => loadStateData("ACCEPT_BOOKING", payload))
      .then(() => loadStateData("SUCCESS", "Rmoved Inquiry!"))
      .catch((err) => loadStateData("ERROR", "Error removing inquiry"));
  };

  return (
    <div>
      <Typography variant="h4">Booked Events</Typography>

      <CollapsibleTable
        bookingInquiries={bookingInquiries}
        handleRemoveInquiry={handleRemoveInquiry}
      />
    </div>
  );
};

export default BookedEvents;
