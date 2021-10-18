import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  CardMedia,
} from "@material-ui/core";

const TemplateCard = ({
  template,
  adminView,
  handleDeleteTemplate,
  handleEditClick,
}) => {
  return (
    <Card style={{ width: "100%", position: "relative" }}>
      <CardMedia image={template.image_url} style={{ height: 200 }} />
      {/* <img style={{ width: "100%" }} src={template.image_url} /> */}

      {adminView && template.front_page ? (
        <Chip
          variant="default"
          color="secondary"
          label="Frontpage"
          style={{ position: "absolute", right: 5, top: 5 }}
        />
      ) : null}

      <CardContent>
        <Typography as="h4" align="center">
          {template.name} <br /> {template.sizing}
        </Typography>
      </CardContent>
      {adminView && (
        <CardActions style={{ justifyContent: "space-between" }}>
          <Button
            variant="text"
            onClick={() => handleDeleteTemplate(template.id)}
            style={{ color: "red" }}
          >
            Delete
          </Button>
          <Button variant="text" onClick={() => handleEditClick(template.id)}>
            Edit
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default TemplateCard;
