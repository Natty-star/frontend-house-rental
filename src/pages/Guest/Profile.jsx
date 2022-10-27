import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../common/header";
import { FormLabel } from "react-bootstrap";
import {instance} from "../../index"

export default function Profile() {
  const [userState, setUserState] = useState({});
  const [isLoadded, setIsLogged] = useState(false);
  const [edited, setEdited] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [paymentType, setPaymentType] = useState("Choose Payment Method");
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [jwt,setJwt] = useState(JSON.parse(localStorage.getItem("jwt")))

  useEffect(() => {
    instance
      .get("/accounts/"+ user.email , {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
      .then((response) => {
        setUserState(response.data);
        const pay = response.data?.paymentMethods
        setPaymentInfo(pay?pay[0]:null);
        setIsLogged(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(event) {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedUser = {
      ...userState,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      address: {
        country:data.get("country"),
        state: data.get("state"),
        city: data.get("city"),
        zip: data.get("zip"),
        street: data.get("address"),
      },
      preferredPayment:data.get('preferredPayment'),
      paymentMethods:[paymentInfo]
    };

    console.log(updatedUser);

    instance
      .put("/accounts/"+ user.email, updatedUser,{
        headers:{
          Authorization: 'Bearer ' + jwt
        }
      })
      .then((response) => {
        console.log(response.data);
        setUserState(updatedUser);
        setIsLogged(true);
        setEdited(true);
      })
      .catch((err) => console.log(err));
  }

  const changePaymentInfo = (event) => {
    setPaymentInfo({...paymentInfo, [event.target.name]: event.target.value });
  };

  const changePaymentType = (event) => {
    setPaymentInfo({...paymentInfo,[event.target.name]: event.target.value })
    setPaymentType(event.target.value);
  };

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
  );

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
  );

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
  );

  return (
    isLoadded && (
      <div>
        <Header />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit your account
          </Typography>
          {edited ? (
            <Alert sx={{ mt: 3, mb: 3 }} severity="success">
              Successfully Edited
            </Alert>
          ) : null}
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid
            container
            columnGap={3}
            justifyContent="center"
            sx={{ marginTop: 3 }}
          >
            <Grid item xs={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    defaultValue={userState.firstName}
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    defaultValue={userState.lastName}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={userState.email}
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
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
                      name="paymentType"
                    >
                      <MenuItem value={"Choose Payment Method"}>
                        Choose Payment Type
                      </MenuItem>
                      <MenuItem value={"CC"}>Credit Card</MenuItem>
                      <MenuItem value={"PAYPAL"}>Paypal</MenuItem>
                      <MenuItem value={"BANK"}>Bank</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    {paymentType == "PAYPAL"
                      ? paypalInputField
                      : paymentType == "CC"
                      ? creditcardInput
                      : paymentType == "BANK"
                      ? bankInputField
                      : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={userState.address?.street}
                    id="address"
                    name="address"
                    label="Address line "
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    defaultValue={userState.address?.city}
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    defaultValue={userState.address?.state}
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    defaultValue={userState.address?.zipcode}
                    id="zip"
                    name="zipcode"
                    label="Zip / Postal code"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    defaultValue={userState.address?.country}
                    id="country"
                    name="country"
                    label="Country "
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  Prefered Payment
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="preferredPayment"
                    defaultValue={userState.preferredPayment}
                  >
                    <FormControlLabel
                      value="CC"
                      control={<Radio />}
                      label="Credt Card"
                    />
                    <FormControlLabel
                      value="PAYPAL"
                      control={<Radio />}
                      label="Paypal"
                    />
                    <FormControlLabel
                      value="BANK"
                      control={<Radio />}
                      label="Bank"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Edit
            </Button>
          </Box>
        </Box>
      </div>
    )
  );
}
