import * as React from "react";
import Header from "../common/header";
import { useEffect, useState } from "react";
import { useNavigate, Route } from "react-router-dom";
import { Box, CircularProgress, Fab, LinearProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { textAlign } from "@mui/system";
import { instance } from "../index";

export default function AllProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState([]);
  const [fetchNear,setFetchNear] = useState(false)

  useEffect(() => {
    async function getProperties() {
      try {
        const response = await instance.get(
          "/property/available"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        setLoginError("You have entered invalid username or password!");
        console.log(error);
        setLoading(false);
      }
    }
    getProperties();
  }, []);

  function handleNearMe(){
    setFetchNear(true);
    let lat , long;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
            lat = position.coords.latitude;
            long = position.coords.longitude; 
            console.log("lat",lat);
            console.log("long",long);
          
            instance.post('/property/nearby',{
                x:long,
                y:lat
            
             
          }).then(response =>{
            setFetchNear(false)
            setData(response.data)
          }).catch(err=>console.log(err))
          }
        },
          (error) => console.log(error));
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    
  
  }
  return (
    <>
      {/* <Header /> */}

      
      <div className="container  custom-cards">
      <Box sx={{ "& > :not(style)": { m: 1 } , textAlign:'right' }} mt={2} mb={0} onClick={handleNearMe}>
        <Fab  variant="extended">
          <LocationOnIcon sx={{ mr: 1 }} />
          Find Near Me
        </Fab>
        </Box>
        {fetchNear ? (
           <Box sx={{ width: '100%' }}>
           <LinearProgress />
         </Box>
        ):null }
     
        <div className="row my-5">
          {data.length > 0 ? (
            data.map((row, index, arr) => {
              return (
                <div key={row.id} className="col-md-4 mb-5">
                  <div className="home">
                    <img
                      src={row.images[0]}
                      alt="House 1"
                      className="home__img"
                    ></img>
                    <h5 className="home__name">{row.propertyName}</h5>
                    <div className="home__location">
                      <p>{row.title}</p>
                    </div>
                    <div className="home__rooms">
                      <p>{"3"} rooms</p>
                    </div>
                    <div className="home__area">
                      <p>{row.address.street_number},</p>
                      <p>{row.address.city}</p>
                    </div>
                    <div className="home__price">
                      <p>${row.price}</p>
                    </div>
                    <button
                      className="btn home__btn"
                      onClick={() => {
                        navigate("/PropertyImageList", {
                          state: { property: row },
                        });
                      }}
                    >
                      Explore More
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>{<CircularProgress color="secondary" />}</div>
          )}
        </div>
      </div>
    </>
  );
}
