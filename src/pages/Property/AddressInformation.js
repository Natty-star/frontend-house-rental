import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  reset,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import addAddressInformation from "../../redux/actions/addAddressInformationAction";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, display } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AddressInformation = forwardRef((props, ref) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
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
  useEffect(() => {
    console.log("lat", latitude);
    console.log("prevInfo", prevInfo);
    dispatch(addAddressInformation(addressData));
  }, [prevInfo]);

  function handleLocation() {
    let la;
    let lo;
    if (!locationEnabled) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              la = position.coords.latitude;
              lo = position.coords.longitude;
              setLatitude(la);
              setLongitude(lo);
              // const latEvent = {
              //   target:{
              //     name:"lat",
              //     value:'20'
              //   }
              // }
              //  let e =   new Event('target',{name:"lat", value:"20"})
              //handleChange(latEvent);
              addressData.lat = la;
              addressData.lon = lo;
              setAddressData({ ...addressData });
              prevInfo = {
                lat: la,
                lon: lo,
              };
              setPrevInfo({ ...prevInfo });
              console.log(addressData);
            }
          },
          (error) => console.log(error)
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }

      setLocationEnabled(true);
    } else {
      setLatitude(null);
      setLongitude(null);
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
            label={latitude && prevInfo ? prevInfo.lat : "Lat"}
            fullWidth
            variant="standard"
            // value={latitude}
            defaultValue={prevInfo ? prevInfo.lat : latitude}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              id="lon"
              name="lon"
              label={longitude && prevInfo ? prevInfo.lon : "Lon"}
              fullWidth
              variant="standard"
              // value={longitude}
              defaultValue={prevInfo ? prevInfo.lon : longitude}
              onChange={handleChange}
            />
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
