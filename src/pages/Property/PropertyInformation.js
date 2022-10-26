import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import AddressInformation from './AddressInformation';
import { useDispatch, useSelector } from 'react-redux';
import addPropertyInformation from '../../redux/actions/addPropertyInformationAction';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';

const PropertyInformation = forwardRef((props, ref) => { 
  ;
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  let prevInfo = counter.propertyInformation[counter.propertyInformation.length - 1];
  const [propertyData, setPropertyData] = useState({
    propertyName: prevInfo ? prevInfo.propertyName : null,
    title: prevInfo ? prevInfo.title : "HOME",
    price: prevInfo ? prevInfo.price : null,
    description: prevInfo ? prevInfo.description : null,
    capacity: prevInfo ? prevInfo.capacity : null,
  });

  const handleChange = (event) => {
    ;
    const { name, value } = event.target;
   
    setPropertyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
  };
  useEffect(()=>{
    dispatch(addPropertyInformation(propertyData));
  },[propertyData])

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="propertyName"
            label="Property Name"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.propertyName : null}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Property Type
        </InputLabel>
        <NativeSelect
         required
          name="title"
          onChange={handleChange}
        >
          <option disabled value="">Select Property</option>
          <option value={"HOME"}>HOME</option>
          <option value={"APARTMENT"}>APPARTMENT</option>

        </NativeSelect>
      </FormControl>

        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            
            name="price"
            label="Price Per Night"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.price : null}
            onChange={handleChange}
          />
        </Grid>
       
   
        <Grid item xs={12} md={6}>
          <TextField
            
            name="capacity"
            label="Capacity"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.capacity : null}
            onChange={handleChange}
          />
        </Grid>
      
      

        <Grid item xs={12}>
          <TextField
        
          name="description"
            label="Property Description"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.description : null}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
});

export default  PropertyInformation;