import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import {useEffect, useState} from 'react'
import axios from "axios";
import { useNavigate, Route } from "react-router-dom";
import Header from '../../common/header';

const theme = createTheme();

export default function LogIn() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [logedin, setLogedin] = useState(false);
  const [roles, setRoles] = useState([]);
  const [firstLetter, setFirstLetter] = useState("");

  const handleSubmit = async(event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    try{
      const response = await axios.post(process.env.REACT_APP_BASE_URL+'/login',{
      username: data.get('email'),
      password: data.get('password')
    })

    localStorage.setItem('MppApp', JSON.stringify(response.data));

    setRoles(roles)
    navigate("/");
    setLoading(false);
    }catch(error){
      setLoginError('You have entered invalid username or password!')
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('start')
    let localValue = localStorage.getItem('MppApp')
    if(localValue){
      navigate("/");
    }else{
      navigate("/login");
    }
    
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <Container component="main" maxWidth="xs" className='reg-background'>
        
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {loginError.length > 0 ? <Alert severity="error">{loginError}</Alert>: null}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
