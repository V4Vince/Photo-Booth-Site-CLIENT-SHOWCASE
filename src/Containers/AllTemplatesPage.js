// import './App.css';
import React, { useEffect, useContext, Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getTemplatePage, getTemplates } from "../api";

import Paragraph from "../Components/Paragraph";
import { Typography, Container, Button, Grid, Grow } from "@material-ui/core";

import { TemplatePageContext, SiteContext } from "../Context/SiteContext";
import TemplateCard from "../Components/TemplateCard";
import VerticalSpacer from "../Components/VerticalSpacer";

const useStyles = makeStyles((theme) => ({
  heading: {
    ...theme.heading,
  },
}));

function AllTemplatesPage() {
  const classes = useStyles();
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  const [templatePage, templates] = useContext(TemplatePageContext);
  const [loadStateData] = useContext(SiteContext);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    if (!templatePage) {
      getTemplatePage().then((data) => loadStateData("TEMPLATE_PAGE", data));
    }
  }, []);

  useEffect(() => {
    getTemplates().then((data) => loadStateData("TEMPLATES", data));
  }, []);

  useEffect(() => {
    setFilteredTemplates(templates);
  }, [templates]);

  const handleFilter = (filterBy) => {
    const allTemplates = templates.filter(
      (template) => template.sizing === filterBy
    );

    setFilteredTemplates(allTemplates);
  };

  if (!templatePage) {
    return null;
  }

  const renderTemplates = () => {
    return filteredTemplates.map((template) => (
      <Grow in timeout={1000} key={template.id}>
        <Grid item xs={6} md={4}>
          <TemplateCard template={template} />
        </Grid>
      </Grow>
    ));
  };

  const renderCategories = (
    <Fragment>
      {[...new Set(templates.map((item) => item.sizing))].map((size) => (
        <Grid key={size} item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleFilter(size)}
          >
            {size}
          </Button>
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setFilteredTemplates(templates)}
        >
          Show All
        </Button>
      </Grid>
    </Fragment>
  );

  return (
    <Container maxWidth="md">
      <VerticalSpacer>
        <Typography as="h4" className={classes.heading} align="center">
          {templatePage.title}
        </Typography>

        <Paragraph>{templatePage.body}</Paragraph>
      </VerticalSpacer>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid container spacing={1} justifyContent="center">
          {renderCategories}
        </Grid>
        {renderTemplates()}
      </Grid>
    </Container>
  );
}

export default AllTemplatesPage;
