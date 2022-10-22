import * as React from "react";
import {useEffect, useState} from 'react'
import { useNavigate, Route } from "react-router-dom";
import axios from "axios";
import Header from "../../common/header";
export default function HostProperties() {
    const navigate = useNavigate ();
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [data, setData] = useState([])
    const [id, setId] = useState("")

    useEffect(() => {
        async function getProperties(){
            try{
                let localValue = JSON.parse(localStorage.getItem('MppApp'))
                console.log(localValue.myUserDetailService.id)
                setId(localValue.myUserDetailService.id)
                const response = await axios.get(process.env.REACT_APP_BASE_URL+'/property/getAllMyPropertyByUserId/'+localValue.myUserDetailService.id)
                console.log(response.data)
                setData(response.data)
              }catch(error){
                setLoginError('You have entered invalid username or password!')
                console.log(error);
                setLoading(false);
              }  
        }
        getProperties()
      },[])


  return (
    <>
      <Header/>
<div className="container  custom-cards">
<div className="row my-5">
{data.length > 0 ? data.map((row, index, arr) => {
    return (
      
            <div className="col-md-4">
                <div class="home">
                    <img src={row.cover_image} alt="House 1" class="home__img"></img>
                    <h5 class="home__name">{row.title}</h5>
                    <div class="home__location">
                
                        <p>{row.address.country}</p>
                    </div>
                    <div class="home__rooms">
                
                        <p>{row.homeProperty.bedNumber} rooms</p>
                    </div>
                    <div class="home__area">
                    
                        <p>{row.address.city}</p>
                    </div>
                    <div class="home__price mb-5">

                        <p>${row.pricePerNight}</p>
                    </div>
                </div>
            </div>
        
    );
})   
:<div>Loading</div>
}
</div> 

</div>

 
    </>
  );
}
