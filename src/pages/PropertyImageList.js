import * as React from 'react';
import Header from '../common/header';
import Checkout from './Reservation/Checkout';
import {useEffect, useState} from 'react'
import { useNavigate, Route, useLocation } from "react-router-dom";
import axios from "axios";

export default function PropertyImageList() {

  const { state } = useLocation()

  const [id, setId] = useState([])
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getProperty(){
        try{
          debugger;
            setId(state.id)
            const response = await axios.get(process.env.REACT_APP_BASE_URL+'/property/'+state.id)
            console.log(response.data.imagess)
            setImages(response.data.imagess)
          }catch(error){
            setLoginError('You have entered invalid username or password!')
            console.log(error);
            setLoading(false);
          }  
    }
    getProperty()
  },[])


  return (
    <>
    <Header/>
    <div class="row mt-5">
      {images.length > 0 ? images.map((row, index, arr) => {
        return (
          <div class="col-md-3 myTestClass">
            <img src={row.url} alt={row.caption} class="img-thumbnail"></img>
          </div>     
        );
      })   
      :<div>Loading</div>
    }
  </div>


    
    <Checkout id={state.id}/>






    </>

  );
}


