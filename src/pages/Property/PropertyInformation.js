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
  var UserToken = JSON.parse(localStorage.getItem('MppApp'));
  let prevInfo = counter.propertyInformation[counter.propertyInformation.length - 1];
  const [propertyData, setPropertyData] = useState({
    title: prevInfo ? prevInfo.title : null,
    type: prevInfo ? prevInfo.type : "HOME",
    bath_room_number: prevInfo ? prevInfo.bath_room_number : null,
    price_per_night: prevInfo ? prevInfo.price_per_night : null,
    bed_number: prevInfo ? prevInfo.bed_number : null,
    bed_room_number: prevInfo ? prevInfo.bed_room_number : null,
    property_description: prevInfo ? prevInfo.property_description : null,
    user_id: UserToken?.myUserDetailService.id,
    space: prevInfo ? prevInfo.space : "SHARED_ROOM",
    capacity: prevInfo ? prevInfo.capacity : null,
  });

  const handleChange = (event) => {
    ;
    const { name, value } = event.target;
   
    setPropertyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    dispatch(addPropertyInformation(propertyData));
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="title"
            label="Property Title"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.title : null}
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
          name="type"
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
            
            name="price_per_night"
            label="Price Per Night"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.price_per_night : null}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            
            name="bath_room_number"
            label="Bath Room Number"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.bath_room_number : null}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Property Space
        </InputLabel>
        <NativeSelect
          name="space"
          onChange={handleChange}
        >
           <option disabled value="">Select Property</option>
          <option value={"SHARED_ROOM"}>SHARED_ROOM</option>
          <option value={"ENTIRE_PLACE"}>ENTIRE_PLACE</option>
          <option value={"PRIVATE_ROOM"}>PRIVATE_ROOM</option>

        </NativeSelect>
      </FormControl>
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
        <Grid item xs={12} md={6}>
          <TextField
            
            name="bed_room_number"
            label="Bed Room Number"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.bed_room_number : null}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            
            name="bed_number"
            label="Bed Number"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.bed_number : null}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
        
          name="property_description"
            label="Property Description"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.property_description : null}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
});

export default  PropertyInformation;