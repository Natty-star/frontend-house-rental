import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import addAddressInformation from "../../redux/actions/addAddressInformationAction";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, display } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CircularProgress } from "@mui/material";

const AddressInformation = forwardRef((props, ref) => {
  const latRef = React.useRef();
  const longRef = React.useRef();
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isFetchedLocation, setIsFetchedLocation] = useState(true);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  let [prevInfo, setPrevInfo] = useState(
    counter.addressInformation[counter.addressInformation.length - 1]
  );

  const [addressData, setAddressData] = useState({
    country: prevInfo ? prevInfo.country : null,
    city: prevInfo ? prevInfo.city : null,
    state: prevInfo ? prevInfo.state : null,
    street_number: prevInfo ? prevInfo.street_number : null,
    zip_code: prevInfo ? prevInfo.zip_code : null,
    lat: prevInfo ? prevInfo.lat : null,
    lon: prevInfo ? prevInfo.lon : null,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    dispatch(addAddressInformation(addressData));
  }, [addressData]);

  function handleLocation() {
    let la;
    let lo;
    setIsFetchedLocation(false);
    if (!locationEnabled) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              la = position.coords.latitude;
              lo = position.coords.longitude;

              addressData.lat = la;
              addressData.lon = lo;
              setAddressData({ ...addressData });
              prevInfo = {
                lat: la,
                lon: lo,
              };
              setPrevInfo({ ...prevInfo });
              console.log(addressData);
              setLocationEnabled(true);
              setIsFetchedLocation(true);
              longRef.current.value = lo;
              latRef.current.value = la;
            }
          },
          (error) => console.log(error)
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    } else {
      setLocationEnabled(false);
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="country"
            label="Country"
            fullWidth
            autoComplete="country"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.country : null}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.city : null}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State"
            fullWidth
            autoComplete="state"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.state : null}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="zipCode"
            name="zip_code"
            label="Zip Code"
            fullWidth
            autoComplete="zipCode"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.zip_code : null}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="lat"
            name="lat"
            placeholder="Latitude"
            fullWidth
            variant="standard"
            inputRef={latRef}
            defaultValue={prevInfo ? prevInfo.lat : null}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              id="lon"
              name="lon"
              placeholder="Longitude"
              fullWidth
              variant="standard"
              inputRef={longRef}
              defaultValue={prevInfo ? prevInfo.lon : null}
              onChange={handleChange}
            />
            <div>
              {isFetchedLocation ? null : (
                <CircularProgress
                  sx={{ color: "#FF385C", mr: 1, my: 0.5 }}
                  size={15}
                />
              )}
            </div>

            <div onClick={handleLocation}>
              {locationEnabled ? (
                <LocationOnIcon sx={{ color: "#FF385C", mr: 1, my: 0.5 }} />
              ) : (
                <LocationOnOutlinedIcon
                  sx={{ color: "#FF385C", mr: 1, my: 0.5 }}
                />
              )}
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="streetNumber"
            name="street_number"
            label="Street Number"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            defaultValue={prevInfo ? prevInfo.street_number : null}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
export default AddressInformation;
