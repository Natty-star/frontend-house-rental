import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressInformation from "./AddressInformation";
import PropertyInformation from "./PropertyInformation";
import ImageInformation from "./ImageInformation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Header from "../../common/header";

const theme = createTheme();

export default function PropertyStepper(props) {
  ;
  const [IsSuccess, setIsSuccess] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const steps = ["Property Information", "Address Information", "Image"];
  const [activeStep, setActiveStep] = React.useState(0);

  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  let propertyInfo =
    counter.propertyInformation[counter.propertyInformation.length - 1];
  let addressInfo =
    counter.addressInformation[counter.addressInformation.length - 1];
  let ImageLIst = counter.propertyImage[counter.propertyImage.length - 1];

  const handleSubmit = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const jwt = JSON.parse(localStorage.getItem('jwt'));
  
    let formData = new FormData();
    

    if (propertyInfo !== undefined) {
      formData.append("userEmail",user.email );
      formData.append("propertyName", propertyInfo.propertyName);
      formData.append("price", propertyInfo.price);
      formData.append("title", propertyInfo.title);
      formData.append("status", false);
      

    }

    if (addressInfo !== undefined) {
      formData.append("city", addressInfo.city);
      formData.append("country", addressInfo.country);
      formData.append("latitude", addressInfo.lat);
      formData.append("longitude", addressInfo.lon);
      formData.append("state", addressInfo.state);
      formData.append("street_number", addressInfo.street_number);
      formData.append("zip_code", addressInfo.zip_code);
    }

    if (ImageLIst !== undefined) {
      var count = Object.keys(ImageLIst).length;
      for(var i = 0; i < count; i++){
          formData.append('images', ImageLIst[i].Attachement);
      }
    }

    const config = {
      
      headers: {
         Authorization: 'Bearer ' + jwt,
         "content-type": "multipart/form-data",
         "Access-Control-Allow-Origin": "*"
        },
    };
    let url ="http://35.222.89.242:8081/api/property/create";
    
    axios.post(url,formData,config).then(response =>{
      console.log(response.data);
      setIsSuccess(true)
      setIsError(false)
      setTimeout(function(){
              window.location.href = '/';
           }, 3000);
    }).catch(err => {
      console.log(err)
      setIsError(true)
    })

    // axios
    //   .post(url, formData, config)
    //   .then((response) => {
    //     debugger;
    //     setIsSuccess(true);
    //     console.log(response);
    //     setTimeout(function(){
    //       window.location.href = '/';
    //    }, 3000);
    //   })
    //   .catch((error) => {
    //     debugger;
    //     console.log(error);
    //     setIsError(true);
    //   });
  
  };

  const handleNext = (newValues) => {
    ;
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setIsError(false);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PropertyInformation />;
      case 1:
        return <AddressInformation />;
      case 2:
        return <ImageInformation />;
      default:
        throw new Error("Mis-step!");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <CssBaseline />
    
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Host your home
          </Typography>
         
         
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
       
          <React.Fragment>
            {IsError &&  <Alert severity="error">Something went wrong! Please try Again.</Alert>}
            {IsSuccess === true ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
               <Alert severity="success">Your Property successfully submited! Thank you!</Alert>
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
                      Save Property
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