import "./App.css";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./common/header";
import Footer from "./common/footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home"
import LogIn from "./pages/UserManagment/LogIn";  
import { Link } from "react-router-dom";
function App() {
  return (
    <>

<Home />

    </>
  );
}

export default App;
