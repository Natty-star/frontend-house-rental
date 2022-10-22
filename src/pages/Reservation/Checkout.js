import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentForm from "./PaymentForm";
import ReservationDate from "./ReservationDate";
import axios from "axios";
import { useState } from "react";
import Alert from "@mui/material/Alert";

const steps = ["Reservation Date", "Confirm and Pay"];



const theme = createTheme();

export default function Checkout(props) {
  ;
  const { id } = props;
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ReservationDate />;
      case 1:
        return <PaymentForm reservationData={reservationData}/>;
      default:
        throw new Error("Unknown step");
    }
  }

  const [IsSuccess, setIsSuccess] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  var UserToken = JSON.parse(localStorage.getItem("MppApp"));
  let [reservationData, setReservationData] = useState([]);

  const handleNext = () => {
    ;
    setIsSuccess(false);
    setIsError(false);
    var startDate = localStorage.getItem("StartDate");
    var endDate = localStorage.getItem("endDate");
    let url =
      process.env.REACT_APP_BASE_URL +
      `/reservation/${UserToken.myUserDetailService.id}/${id}`;

    axios({
      headers: {
        Authorization: "Bearer " + UserToken?.jwt,
        "Access-Control-Allow-Credentials": true,
      },
      method: "post",
      url: url,
      data: {
        startDate: startDate,
        endDate: endDate,
      },
    })
      .then((response) => {
        ;
        console.log(response);
        setReservationData(response.data);
        setActiveStep(activeStep + 1);
      })
      .catch((error) => {
        ;
        console.log(error);
        setErrorMessage(
          error.response?.data.message
            ? error.response.data.message
            : error.message
        );
        setIsError(true);
      });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    setIsSuccess(false);
    setIsError(false);
    let url =
      process.env.REACT_APP_BASE_URL +
      `/payment/${reservationData.refNumber}/${UserToken.myUserDetailService.id}`;

    axios({
      headers: {
        Authorization: "Bearer " + UserToken?.jwt,
        "Access-Control-Allow-Credentials": true,
      },
      method: "post",
      url: url,
      data: reservationData,
    })
      .then((response) => {
        ;
        console.log(response);
        setIsSuccess(true);
      })
      .catch((error) => {
        ;
        console.log(error);
        setErrorMessage(
          error.response?.data.message
            ? error.response.data.message
            : error.message
        );
        setIsError(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {IsSuccess === true && (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                <Alert severity="success">
                  Your Property successfully Reserved! Thank you!
                </Alert>
              </Typography>
            </React.Fragment>
          )}

          {IsError === true && (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                <Alert severity="error">{ErrorMessage}</Alert>
              </Typography>
            </React.Fragment>
          )}
          <Typography component="h1" variant="h4" align="center">
            Reserev Property
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Confirm and Pay
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
