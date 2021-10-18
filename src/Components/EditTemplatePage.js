import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Fragment, useEffect, useState, useRef, useContext } from "react";
import Paragraph from "./Paragraph";
import TemplateCard from "./TemplateCard";
import NewTemplateForm from "./NewTemplateForm";
import VerticalSpacer from "./VerticalSpacer";
import AddIcon from "@material-ui/icons/Add";

import {
  getTemplatePage,
  getTemplates,
  updateTemplatePage,
  createTemplate,
  deleteTemplate,
  updateTemplate,
} from "../api";

import { TemplatePageContext, SiteContext } from "../Context/SiteContext";

const EditTemplatePage = () => {
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentEditForm, setCurrentEditForm] = useState(null);
  const [templatePage, templates] = useContext(TemplatePageContext);
  const [loadStateData] = useContext(SiteContext);

  useEffect(() => {
    getTemplatePage()
      .then((payload) => {
        loadStateData("TEMPLATE_PAGE", payload);
        return payload;
      })
      .then((payload) => {
        setTitle(payload.title);
        setBody(payload.body);
      })
      .catch((err) => alert("unable to load template page data"));
  }, []);

  useEffect(() => {
    getTemplates()
      .then((payload) => {
        loadStateData("TEMPLATES", payload);
      })
      .catch((err) => alert("unable to load template page data"));
  }, []);

  const handleTemplatePageUpdate = () => {
    const updatedPackagePageData = {
      title,
      body,
    };

    updateTemplatePage(updatedPackagePageData)
      .then((payload) => {
        loadStateData("TEMPLATE_PAGE", payload);
      })
      .then(() => loadStateData("SUCCESS", "Updated Template Page!"))
      .catch((err) => loadStateData("ERROR", "Error updating Template Page"));
  };

  const handleCreateTemplate = (templateData) => {
    // console.log("TEMPLATE", templateData);

    createTemplate(templateData)
      .then((payload) => loadStateData("CREATE_TEMPLATE", payload))
      .then(() => setShowNewTemplateForm(false))
      .then(() => loadStateData("SUCCESS", "Created new template!"))
      .catch((err) => loadStateData("ERROR", "Error creating new template"));
  };

  const handleUpdateTemplate = (template) => {
    // console.log("TEMPLATE", template);
    updateTemplate(template, currentEditForm)
      .then((payload) => loadStateData("UPDATE_TEMPLATE", payload))
      .then(() => setCurrentEditForm(null))
      .then(() => loadStateData("SUCCESS", "Updated template!"))
      .catch((err) => loadStateData("ERROR", "Error updating template"));
  };

  const handleDeleteTemplate = (id) => {
    deleteTemplate(id)
      .then((payload) => loadStateData("DELETE_TEMPLATE", payload))
      .then(() => loadStateData("SUCCESS", "Deleted template!"))
      .catch((err) => loadStateData("ERROR", "Error deleting template"));
  };

  const handleEditClick = (id) => setCurrentEditForm(id);

  const renderTemplates = () => {
    return templates.map((template) => (
      <Fragment key={template.id}>
        <Grid item xs={12} md={4} key={template.id}>
          {template.id === currentEditForm ? (
            <NewTemplateForm
              isEditing
              templateData={template}
              closeForm={() => setCurrentEditForm(null)}
              handleCreateTemplate={handleCreateTemplate}
              handleUpdateTemplate={handleUpdateTemplate}
            />
          ) : (
            <TemplateCard
              template={template}
              adminView
              handleDeleteTemplate={handleDeleteTemplate}
              handleEditClick={handleEditClick}
            />
          )}
        </Grid>
      </Fragment>
    ));
  };

  return (
    <Fragment>
      <Grid container>
        <Typography variant="h5" style={{ marginBottom: 15 }}>
          Edit Templates Section
        </Typography>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Container maxWidth="md">
                <TextField
                  value={title}
                  label="Title"
                  fullWidth
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Container>
            </CardContent>
            <CardContent>
              <Container maxWidth="md">
                <TextField
                  value={body}
                  label="Body"
                  multiline
                  fullWidth
                  onChange={(e) => setBody(e.target.value)}
                />
              </Container>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleTemplatePageUpdate}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {showNewTemplateForm && (
        <VerticalSpacer top={25} bottom={25}>
          <NewTemplateForm
            closeForm={() => setShowNewTemplateForm(false)}
            handleCreateTemplate={handleCreateTemplate}
          />
        </VerticalSpacer>
      )}

      <VerticalSpacer top={25} bottom={25} />

      {!showNewTemplateForm && (
        <span style={{ float: "right" }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setShowNewTemplateForm(true)}
          >
            New Template
          </Button>
        </span>
      )}

      <Typography variant="h5" style={{ marginBottom: 15 }}>
        Current Templates
      </Typography>

      <Grid container spacing={1}>
        {renderTemplates()}
      </Grid>
    </Fragment>
  );
};

export default EditTemplatePage;
