// import './App.css';
import { useEffect, useContext, Fragment, forwardRef, useRef } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getPackagePage, getPricingPackages } from "../api";

import { Typography, Grid, Zoom, Fade, Container } from "@material-ui/core";

import Paragraph from "../Components/Paragraph";
import PackageCard from "../Components/PackageCards";
import { PackagePageContext, SiteContext } from "../Context/SiteContext";
import VerticalSpacer from "../Components/VerticalSpacer";

import { useInView } from "react-intersection-observer";

const useStyles = makeStyles((theme) => ({
  heading: {
    ...theme.heading,
  },
}));

function PackagesPage() {
  const classes = useStyles();
  const history = useHistory();
  const [packagePage, packages] = useContext(PackagePageContext);
  const [loadStateData] = useContext(SiteContext);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    if (!packages.length && inView) {
      getPricingPackages()
        .then((data) => loadStateData("PACKAGES", data))
        .catch((error) => console.log("ERROR"));
    }
  }, [inView]);

  const handlePackageSelect = (packageData) => {
    history.push({
      pathname: "/request-booking",
      state: {
        selectedPackage: packageData,
      },
    });
  };

  if (!packagePage) {
    return null;
  }

  const renderCards = () => {
    return packages.map((packageData, index) => (
      <Zoom key={index} in={inView} timeout={(index + 1) * 500}>
        <Grid item xs={12} md={4}>
          <PackageCard
            price={packageData.price}
            title={packageData.title}
            lineItems={packageData.line_items}
            handleSelect={() => handlePackageSelect(packageData)}
          />
        </Grid>
      </Zoom>
    ));
  };

  return (
    <Container maxWidth="md">
      <Fade ref={ref} in timeout={1000}>
        <div>
          <Typography className={classes.heading} align="center">
            {packagePage.title}
          </Typography>

          <Paragraph>{packagePage.body}</Paragraph>
        </div>
      </Fade>
      <VerticalSpacer top={50} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        {renderCards()}
      </Grid>
    </Container>
  );
}

export default PackagesPage;
