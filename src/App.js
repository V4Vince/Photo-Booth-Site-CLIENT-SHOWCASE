import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import AdminPage from "./Containers/AdminPage";
import RequestBookingPage from "./Containers/RequestBookingPage";

import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import BookingRequestComplete from "./Containers/BookingCompleteForm";
import SpaContainer from "./Containers/SpaContainer";
import AllTemplatesPage from "./Containers/AllTemplatesPage";

import { ScrollToTop } from "./Util/ScrollToTop";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.appBackground,
  },
  contentContainer: {
    paddingTop: 50,
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <NavBar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div className={classes.contentContainer}>
          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => <SpaContainer {...props} />}
            />
            <Route
              path={["/about", "/pricing", "/gallery", "/templates"]}
              render={(props) => <SpaContainer {...props} />}
            />

            <Route path="/all-templates">
              <AllTemplatesPage />
            </Route>
            <Route path="/request-booking">
              <RequestBookingPage />
            </Route>
            <Route path="/request-booking_success">
              <BookingRequestComplete />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
          </Switch>
        </div>
        <div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
