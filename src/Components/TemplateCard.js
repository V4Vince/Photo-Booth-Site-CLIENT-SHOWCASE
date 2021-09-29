import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
} from "@material-ui/core";

const TemplateCard = ({ template, adminView, handleDeleteTemplate }) => {
  return (
    <Card style={{ width: "100%", position: "relative" }}>
      <Box
        style={{
          height: "250px",
          width: "100%",
          background: `url(${template.image_url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
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
        <CardActions>
          <Button
            variant="text"
            onClick={() => handleDeleteTemplate(template.id)}
            style={{ color: "red" }}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default TemplateCard;
