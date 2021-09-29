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
              path={["/about", "/pricing", "/gallery", "/templates"]}
              render={(props) => <SpaContainer {...props} />}
            />

            <Route path="/all-templates">
              <ScrollToTop>
                <AllTemplatesPage />
              </ScrollToTop>
            </Route>
            <Route path="/request-booking">
              <ScrollToTop>
                <RequestBookingPage />
              </ScrollToTop>
            </Route>
            <Route path="/request-booking_success">
              <ScrollToTop>
                <BookingRequestComplete />
              </ScrollToTop>
            </Route>
            <Route path="/admin">
              <ScrollToTop>
                <AdminPage />
              </ScrollToTop>
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
