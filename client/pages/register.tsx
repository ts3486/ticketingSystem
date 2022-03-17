import React, { useState } from "react";
import { Typography, Card, Container, FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material";
import { useRegisterMutation } from "../graphql/graphql_gen/generated/graphql";

const Register = () => {
  const [username, setUsername] = useState("");
  const [register] = useRegisterMutation();

  const onSubmit = async () => {
    const response = await register({
      variables: {
        username: username,
      },
    });

    console.log("user added to db", response);

    window.location.href = "/";
  };

  return (
    <Container>
      <Card>
        <Typography variant="h1">Register</Typography>

        <FormControl margin="normal">
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            aria-describedby="username"
            onChange={(e: any) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter username..."
          />
          <FormHelperText id="username"></FormHelperText>
        </FormControl>

        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Card>
    </Container>
  );
};

export default Register;
