import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Route } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { validateEmail } from "../../validation";
import Header from "../../common/header";

const theme = createTheme();

export default function SignUp() {
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      validateEmail(data.get("email")) &&
      data.get("email") &&
      data.get("password")
    ) {
      setValidEmail(true);
      axios
        .post("http://35.222.89.242:8081/api/accounts/register", {
          email: data.get("email"),
          password: data.get("password"),
          address: { country: data.get("country") },
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          roles: [
            {
              name: role,
            },
          ],
        })
        .then((response) => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    } else {
      if (!data.get("password")) {
        setValidPassword(false);
      }
      if (validateEmail(data.get("email"))) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    }
  };

  useEffect(() => {
    let localValue = localStorage.getItem("jwt");
    if (localValue) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);

  const [role, setRole] = React.useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const inValidInput = (
    <TextField
      error
      helperText="Incorrect email format."
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
    />
  );
  const validInput = (
    <TextField
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
    />
  );
  const inValidInputPassword = (
    <TextField
      error
      helperText="Can not be empty"
      required
      fullWidth
      id="password"
      label="Password"
      type="password"
      name="password"
      autoComplete="password"
    />
  );
  const validInputPassword = (
    <TextField
      required
      fullWidth
      id="password"
      label="Password"
      type="password"
      name="password"
      autoComplete="new-password"
    />
  );

  return (
    <>
    <Header/>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="reg-background">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  {validEmail ? validInput : inValidInput}
                </Grid>

                <Grid item xs={12}>
                  {validPassword ? validInputPassword : inValidInputPassword}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      onChange={handleRoleChange}
                    >
                      <MenuItem value={"user"}>GUEST</MenuItem>
                      <MenuItem value={"admin"}>HOST</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/logIn" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
