import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm(props) {
  ;
  const { reservationData } = props;
  return (
<>
<ul class="list-group list-group-light">
  <li class="list-group-item ">
  <strong>Reference Number   :</strong> <span class="text-start">{reservationData.refNumber}</span>

  </li>
  <li class="list-group-item ">
  <strong>Start Date   :</strong>  <span class="text-start">{reservationData.startDate}</span>

  </li>
  <li class="list-group-item ">
  <strong>End Date  :</strong>  <span class="text-left">{reservationData.endDate}</span>

  </li>
  <li class="list-group-item ">
   <strong>Calculated Price   :</strong> <span class="text-left">{reservationData.calculatedPrice}</span>
  </li>

</ul></>
  );
}