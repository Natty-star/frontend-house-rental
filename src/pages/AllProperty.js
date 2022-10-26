import * as React from "react";
import Header from "../common/header";
import { useEffect, useState } from "react";
import { useNavigate, Route } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress, Fab } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { textAlign } from "@mui/system";
export default function AllProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getProperties() {
      try {
        const response = await axios.get(
          "http://35.222.89.242:8081/api/property/available"
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
    // axios.get('http://35.222.89.242:8081/api/property/')
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
