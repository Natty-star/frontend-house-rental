import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Route } from "react-router-dom";
import axios from "axios";
import Header from "../../common/header";
import { CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function HostProperties() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    axios
      .get(
        "http://35.222.89.242:8081/api/property/getByEmail?userEmail=" +
          user.email,
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="container  custom-cards">
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
                    <div className="mt-5 home__location">
                      <p className="mb-0">{row.title} </p>
                    </div>
                    <div className="home__area">
                      <LocationOnIcon className="location__icon" />
                      <p className="mb-0">{row.address.city}, </p>
                      <p className="mb-0">{row.address.street_number} </p>
                    </div>
                    <div className="home__price">
                      <p>
                        <span className="home_price_dollar">${row.price} </span>
                        <span className="home_price_night">night</span>
                      </p>
                    </div>
                    <div className="home__price">
                      <p
                        className={
                          row.status ? "home__occupied" : "home__vacant"
                        }
                      >
                        {" "}
                        {row.status ? "Occupied" : "Vacant"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <CircularProgress color="secondary" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
