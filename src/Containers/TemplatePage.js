// import './App.css';
import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getTemplatePage, getTemplates } from "../api";

import Paragraph from "../Components/Paragraph";
import { Typography, Container, Button, Grid } from "@material-ui/core";

import { TemplatePageContext, SiteContext } from "../Context/SiteContext";
import TemplateCard from "../Components/TemplateCard";
import { useHistory } from "react-router";

// import { useInView } from "react-intersection-observer";

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

  // const { ref, inView, entry } = useInView({
  //   /* Optional options */
  //   triggerOnce: true,
  //   threshold: 0,
  // });

  useEffect(() => {
    if (!templatePage) {
      getTemplatePage().then((data) => loadStateData("TEMPLATE_PAGE", data));
    }
  }, []);

  useEffect(() => {
    if (!templates.length) {
      getTemplates().then((data) => loadStateData("TEMPLATES", data));
    }
  }, []);

  if (!templatePage) {
    return null;
  }

  const renderTemplates = () => {
    return templates.map((template) => (
      <Grid item xs={6} md={4} key={template.id}>
        <TemplateCard template={template} />
      </Grid>
    ));
  };

  return (
    <Container maxWidth="md">
      <div>
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
      <Grid container justifyContent="center" style={{ marginTop: 15 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push("/all-templates")}
        >
          More Templates
        </Button>
      </Grid>
    </Container>
  );
}

export default TemplatesPage;
