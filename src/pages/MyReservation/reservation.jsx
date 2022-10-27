import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Stack } from "react-bootstrap";
import Moment from "moment";
import { Alert, InputLabel, MenuItem, Select } from "@mui/material";
import {instance} from "../../index";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Reservation(props) {
    const navigate = useNavigate();
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [paymentType, setPaymentType] = React.useState("Choose Payment Method");
    const [paymentInfo,setPaymentInfo] = React.useState({
      routingNumber:'',
      bankAccount:'',
      ccNumber:'',
      CCV:'',
      payPalEmail:''
    })
    const [status,setStatus] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if(localStorage.getItem('user')){
        const user = JSON.parse(localStorage.getItem('user'))
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        if(paymentType == 'Choose Payment Method') paymentType=null;
        const paymentMethod = {...paymentInfo,paymentType:paymentType}
        console.log('userEmail:', user.email,
            'propertyId:', props.id,
            'startDate:', startDate,
            'endDate:', endDate,
            'paymentType:', paymentType,
            'paymentMethod:',paymentMethod
            );
        instance.post("/reservation",{
            userEmail: user.email,
            propertyId: props.id,
            startDate: startDate,
            endDate: endDate,
            paymentType: paymentType,
            paymentMethod:paymentMethod
        },
        {
            headers:{
                Authorization: 'Bearer ' + jwt
            }
        }
        ).then(response =>{
            console.log(response.data);
            if(response.data == 'Successfully Reserved') setStatus('success')
            else setStatus('error')
        }).catch(err=>console.log(err))

    }else{
        navigate('/login')
    }
   
  };

  const changePaymentType = (event) => {
    console.log(event.target.value);
    setPaymentType(event.target.value)
    
  };

 
  const changePaymentInfo = (event)=>{
    setPaymentInfo({...paymentInfo,[event.target.name]:event.target.value})
  }
  const creditcardInput = (
    <div> 
    <Grid container spacing={2}>
    <Grid item xs={12} sm={8}>
      <TextField
        name="ccNumber"
        required
        fullWidth
        id="creditcatd"
        label="Credit Card Number"
        onChange={changePaymentInfo}
        autoFocus
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        fullWidth
        id="ccv"
        label=" CCV"
        name="CCV"
        onChange={changePaymentInfo}
      />
    </Grid>
    </Grid>
    </div>
  )

  const paypalInputField = (
    <div>  
    <Grid item xs={12} sm={12}>
      <TextField
        name="payPalEmail"
        required
        fullWidth
        id="paypalEmail"
        label="Paypal Email"
        autoFocus
        onChange={changePaymentInfo}
      />
    </Grid>
   
    </div>
  )

  const bankInputField = (
    <div>  
    <Grid item xs={12} sm={12}>
      <TextField
        name="bankAccount"
        required
        fullWidth
        id="bankaccount"
        label="Bank Account"
        autoFocus
        onChange={changePaymentInfo}
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        name="routingNumber"
        required
        fullWidth
        id="routingnumber"
        label="Routing Number"
        autoFocus
        onChange={changePaymentInfo}
      />
    </Grid>
   
    </div>

  )



  const handleStartDate = (newValue) => {
    newValue = Moment().format(
      newValue.getFullYear() +
        "-" +
        ("0" + (newValue.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + newValue.getDate()).slice(-2)
    );
    setStartDate(newValue);
    console.log(newValue);
  };

  const handleEndDate = (newValue) => {
    newValue = Moment().format(
      newValue.getFullYear() +
        "-" +
        ("0" + (newValue.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + newValue.getDate()).slice(-2)
    );
    setEndDate(newValue);
    console.log(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <EventSeatIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reservation
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      disablePast
                      label="Check In"
                      inputFormat="yyyy/MM/dd"
                      value={startDate}
                      onChange={handleStartDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      disablePast
                      label="Check Out"
                      inputFormat="yyyy/MM/dd"
                      value={endDate}
                      onChange={handleEndDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">
                  Payment Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={paymentType}
                  label="Paymnet Type"
                  onChange={changePaymentType}
                >
                  <MenuItem value={"Choose Payment Method"}>Choose Payment Type</MenuItem>
                  <MenuItem value={"CC"}>Credit Card</MenuItem>
                  <MenuItem value={"PAYPAL"}>Paypal</MenuItem>
                  <MenuItem value={"BANK"}>Bank</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                
                { paymentType == 'PAYPAL' ? paypalInputField  : paymentType == 'CC' ? creditcardInput : paymentType =='BANK' ? bankInputField :null }
              </Grid>
            
            </Grid>
            <Grid item xs={12}>   
            {status == 'success' ? <Alert severity="success">House Sucessfuly Reserved</Alert> : status == "error" ? <Alert severity="error">House Aleady Reserved</Alert> : null }
             
             
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reserve
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
