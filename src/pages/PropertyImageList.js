import * as React from 'react';
import Header from '../common/header';

import {useEffect, useState} from 'react'
import { useNavigate, Route, useLocation } from "react-router-dom";
import Reservation from './MyReservation/reservation';
export default function PropertyImageList() {

  const { state } = useLocation()
  const [property,setProperty] = useState();

  useEffect(() => {
    console.log(state.property);
    setProperty(state.property)
  
  },[])


  return (
    <>
    <Header/>

    <div className="row mt-5">
      {property?.images.map((row, index, arr) => {
        return (
          <div key={row + index} className="col-md-3 myTestClass">
            <img src={row} alt={'House picture'} className="img-thumbnail"></img>
          </div>     
        );
      })   
    }
  </div>

    <Reservation {...property}/>






    </>

  );
}


