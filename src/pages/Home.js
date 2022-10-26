import * as React from "react";
import HeroImageOne from "../common/assets/img/story-1.jpeg";
import HeroImageTwo from "../common/assets/img/story-2.jpeg";
import AllProperty from "./AllProperty";
import {useEffect, useState} from 'react'
import { useNavigate, Route } from "react-router-dom";
import Header from "../common/header";

export default function Home() {

  const navigate = useNavigate();
  const [firstLetter, setFirstLetter] = useState("");
  

  return (
    <>
 <Header/>
     
      {/* <div className="row story_background">
          <div className="col-md-6 equal">
            <div className="story__pictures">
              <img
                src={"https://dvyvvujm9h0uq.cloudfront.net/com/articles/1585857381-790431-photo-by-ann-danilina-on-unsplashjpg.jpg"}
                alt="Couple with new house"
                className="story__img--1"
              ></img>
              <img
                src={HeroImageTwo}
                alt="New house"
                className="story__img--2"
              ></img>
            </div>
          </div>
          <div className="col-md-6 equal">
            <div className="story__content">
              <h3 className="heading-3 mb-sm">Happy Customers</h3>
              <h2 className="heading-2 heading-2--dark mb-md">
                “The best decision of our lives”
              </h2>
              <p className="story__text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur distinctio necessitatibus pariatur voluptatibus. Quidem
                consequatur harum volupta!
              </p>
              <button className="btn">Find your Favorite home</button>
            </div>
          </div>
        </div> */}
        <AllProperty/>
    </>
  );
}
