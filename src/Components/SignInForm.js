import { useState } from "react";

import {
  TextField,
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
import VerticalSpacer from "./VerticalSpacer";

const SignInForm = ({ submitForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    const credentials = { email, password };
    submitForm(credentials);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Sign In</Typography>
            <Divider />
            <Container maxWidth="sm">
              <VerticalSpacer bottom={1}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </VerticalSpacer>

              <VerticalSpacer>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </VerticalSpacer>
            </Container>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
