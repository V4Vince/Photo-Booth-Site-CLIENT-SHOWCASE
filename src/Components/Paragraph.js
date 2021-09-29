import Typography from "@material-ui/core/Typography";

const Paragraph = ({ children }) => {
  return (
    <Typography
      style={{
        fontSize: "1rem",
        whiteSpace: "pre-wrap",
        textAlign: "center",
      }}
      paragraph
      variant="body1"
    >
      {children}
    </Typography>
  );
};

export default Paragraph;
