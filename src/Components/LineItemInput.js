import { useState } from "react";
import { TextField } from "@material-ui/core";

const LineItemInput = () => {
  const [text, setText] = useState("");

  return (
    <TextField
      fullWidth
      label="line item"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
