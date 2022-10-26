import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LogIn from './pages/UserManagment/LogIn';
import Header from './common/header';
import Footer from './common/footer';
import SignUp from './pages/UserManagment/SignUp';
import PropertyImageList from './pages/PropertyImageList';
import PropertyStepper from './pages/Property/PropertyStepper';
import Admin from './pages/Admin/Admin';
import { Provider } from 'react-redux'
import configureStore from "./redux/configureStore";
import HostProperties from './pages/HostProperty/HostProperties';
import MYProperty from './pages/Guest/MYProperty';
import Reservation from './pages/MyReservation/reservation';
import ReservationList from './pages/Guest/ReservationList';
import Profile from './pages/Guest/Profile';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore();
root.render(
  <Provider store={store}>
      <React.StrictMode>
   <BrowserRouter>
   {/* <Header /> */}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path='PropertyImageList' element={<PropertyImageList />} />
      {/* <Route path='admin' element={<Admin />} /> */}
      <Route path='PropertyStepper' element={<PropertyStepper />} />
      <Route path='hostProperties' element={<HostProperties />} />
      <Route path='MYProperty' element={<ReservationList />} />
      <Route path='profile' element={<Profile/>} />


    </Routes>
    <Footer />
  </BrowserRouter>
  </React.StrictMode>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
