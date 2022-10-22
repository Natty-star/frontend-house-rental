import * as React from "react";
import HeroImageOne from "../common/assets/img/story-1.jpeg";
import HeroImageTwo from "../common/assets/img/story-2.jpeg";
import AllProperty from "./AllProperty";
import {useEffect, useState} from 'react'
import { useNavigate, Route } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();
  const [firstLetter, setFirstLetter] = useState("");
  

  return (
    <>
 {/* <Header/> */}
      <AllProperty/>

 
      <div class="row story_background">
          <div class="col-md-6 equal">
            <div class="story__pictures">
              <img
                src={HeroImageOne}
                alt="Couple with new house"
                class="story__img--1"
              ></img>
              <img
                src={HeroImageTwo}
                alt="New house"
                class="story__img--2"
              ></img>
            </div>
          </div>
          <div class="col-md-6 equal">
            <div class="story__content">
              <h3 class="heading-3 mb-sm">Happy Customers</h3>
              <h2 class="heading-2 heading-2--dark mb-md">
                “The best decision of our lives”
              </h2>
              <p class="story__text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur distinctio necessitatibus pariatur voluptatibus. Quidem
                consequatur harum volupta!
              </p>
              <button class="btn">Find your Favorite home</button>
            </div>
          </div>
        </div>
    </>
  );
}
