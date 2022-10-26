import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Route } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DialogContentText from '@mui/material/DialogContentText';
import Header from "../../common/header";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function MYProperty() {
  const [open, setOpen] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const [IsSuccess, setIsSuccess] = useState(false);
  let UserToken = JSON.parse(localStorage.getItem("MppApp"));
  const [data, setData] = useState([]);
  const [propertyId, setPropertyId] = useState();
  const [reviewText, setreviewText] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const navigate = useNavigate();
  const handleClickOpen = (id) => {
    debugger;
    setOpen(true);
    setPropertyId(id)

  };
  const handleClickOpenTwo = (refNumber) => {
    setOpenTwo(true);
    setRefNumber(refNumber);
  };
  const handleClose = () => {
    setOpen(false);
    setIsSuccess(false);
  };
  const handleCloseTwo = () => {
    setOpenTwo(false);
  };
  const handelCancel = () =>{
    debugger;
    axios({
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
      method: "post",
      url: process.env.REACT_APP_BASE_URL + `/reservation/cancel/${refNumber}/${UserToken.myUserDetailService.id}`,
    })
      .then((response) => {
        debugger;
        setIsSuccess(true);
        setOpenTwo(false);
        window.location.reload();
      })
      .catch((error) => {
        debugger;
        setIsSuccess(true);
        setOpenTwo(false);
        console.log("error" + error.message);
      });
  }
  const handlesubmit = () => {
    debugger;
    axios({
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
      method: "post",
      url: process.env.REACT_APP_BASE_URL + `/property/${propertyId}/${UserToken.myUserDetailService.id}/review`,
      data: { "review": reviewText},
    })
      .then((response) => {
        setIsSuccess(true);
      })
      .catch((error) => {
        console.log("error" + error.message);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:8084/api/reservation/zedshif123@gmail.com')
    .then(response =>{
      setData(response.data)
      console.log(response.data);
    }).catch(err=>console.log(err))
   
  }, []);
  return (
    <>
    {/* <Header/> */}
    
      <div className="container  custom-cards">
        <div className="row my-5">
          {data?.length > 0 ? (
            data.map((row, index, arr) => {
              return (
                <div className="col-md-4 mb-5">
                  <div class="home">
                    <img
                      src={row.images[0]}
                      alt="House 1"
                      class="home__img"
                    ></img>
                    <h5 class="home__name">{row.property.title}</h5>
                    <div class="home__location">
                      <p>{row.property.address.country}</p>
                    </div>
                    <div class="home__rooms">
                      <p>{row.property.homeProperty.bedNumber} rooms</p>
                    </div>
                    <div class="home__area">
                      <p>{row.property.address.city}</p>
                    </div>
                    <div class="home__price">
                      <p>${row.property.pricePerNight}</p>
                    </div>
                    {/* <button
                      class="btn home__btn"
                      onClick={() => handleClickOpen(row.property.id,)}
                    >
                      Review Property
                    </button> */}
                    <Button variant="outlined" onClick={() => handleClickOpen(row.property.id,)}>Review</Button>
                    <Button variant="outlined" onClick={() => handleClickOpenTwo(row.refNumber,)}>Cancel</Button>
                  </div>
                </div>
              );
            })
          ) : null}
        </div>
      </div>

      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Review Property
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              {IsSuccess && <Alert severity="success">Your Review successfully submited!</Alert>}
              <TextField
                fullWidth
                label="Your Message"
                id="fullWidth"
                className="my-4"
                multiline
                rows={5}
                onChange={(e) => setreviewText(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handlesubmit}>
              Review
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      <div>
        <BootstrapDialog
          onClose={handleCloseTwo}
          aria-labelledby="customized-dialog-title"
          open={openTwo}
        >
          
    <DialogContent>
          <DialogContentText>
           Are you sure you want to cancel this reservation ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pb-5">
          <Button autoFocus onClick={handleCloseTwo}>
            No
          </Button>
          <Button onClick={handelCancel} autoFocus>
            yes
          </Button>
        </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
}
