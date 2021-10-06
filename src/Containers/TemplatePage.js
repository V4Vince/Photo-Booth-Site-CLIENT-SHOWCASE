// import './App.css';
import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getTemplates } from "../api";

import Paragraph from "../Components/Paragraph";
import { Typography, Container, Button, Grid, Zoom } from "@material-ui/core";

import { TemplatePageContext, SiteContext } from "../Context/SiteContext";
import TemplateCard from "../Components/TemplateCard";
import { useHistory } from "react-router";

import { useInView } from "react-intersection-observer";

const useStyles = makeStyles((theme) => ({
  heading: {
    ...theme.heading,
  },
}));

function TemplatesPage() {
  const classes = useStyles();
  const history = useHistory();
  const [templatePage, templates] = useContext(TemplatePageContext);
  const [loadStateData] = useContext(SiteContext);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    if (!templates.length && inView) {
      getTemplates()
        .then((data) => loadStateData("TEMPLATES", data))
        .catch(() => console.log("ERROR LOADING TEMPLATES"));
    }
  }, [inView]);

  if (!templatePage) {
    return null;
  }

  const renderTemplates = () => {
    return templates
      .filter((template) => template.front_page)
      .map((template, index) => (
        <Zoom key={index} in={inView} timeout={(index + 1) * 500}>
          <Grid item xs={6} md={4}>
            <TemplateCard template={template} />
          </Grid>
        </Zoom>
      ));
  };

  return (
    <Container maxWidth="md">
      <div ref={ref}>
        <Typography as="h4" className={classes.heading} align="center">
          {templatePage.title}
        </Typography>

        <Paragraph>{templatePage.body}</Paragraph>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        {renderTemplates()}
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: 50 }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => history.push("/all-templates")}
        >
          More Templates
        </Button>
      </Grid>
    </Container>
  );
}

export default TemplatesPage;
