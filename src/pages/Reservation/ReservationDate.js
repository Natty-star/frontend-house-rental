import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Checkout from './Checkout';
import Moment from 'moment';

export default function ReservationDate() {
  ;
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());


  const handleStartDate = (newValue) => {
    ;
    setStartDate(newValue);

    newValue = Moment().format(newValue.getFullYear() + 
    "-" + ("0" + (newValue.getMonth() + 1)).slice(-2) + "-" + 
    ("0" + newValue.getDate()).slice(-2));

    localStorage.setItem('StartDate', newValue);
    
   
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
    newValue = Moment().format(newValue.getFullYear() + 
    "-" + ("0" + (newValue.getMonth() + 1)).slice(-2) + "-" + 
    ("0" + newValue.getDate()).slice(-2));

    localStorage.setItem('endDate', newValue);
  };


  return (
    <>
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reservation Date
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
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
          label="Check Out"
          inputFormat="yyyy/MM/dd"
          value={endDate}
          onChange={handleEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
    </Grid>
      </Grid>
    </React.Fragment>
    </>

  );
}