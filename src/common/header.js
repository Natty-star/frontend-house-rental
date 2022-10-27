import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useNavigate, Link, Route } from "react-router-dom";
import LogIn from "../pages/UserManagment/LogIn";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Toolbar } from "@mui/material";
export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [role, setRole] = useState([]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogIn = () => {
    navigate("/logIn");
  };
  const handleSignUp = () => {
    navigate("/SignUp");
  };
  const handleHost = () => {
    navigate("/PropertyStepper");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const handleMyReservation = () => {
    navigate("/MYProperty");
  };

  const handleMyHost = () => {
    navigate("/hostProperties");
  };

  const handleMyProfile = () => {
    navigate("/profile");
  };

  const [firstLetter, setFirstLetter] = useState("");
  const [logedin, setLogedin] = useState(false);

  useEffect(() => {
    let localValue = JSON.parse(localStorage.getItem("user"));
    // if(!localValue){
    //   navigate("/");
    // }
    if (localValue) {
      setFirstLetter(localValue.firstName[0].toUpperCase());
      let roles = [];
      for (const element of localValue.roles) {
        roles.push(element.name);
      }
      setRole(roles);
      setLogedin(true);
    }
  }, []);
  return (
    <>
      <header>
        <div className="navbar navbar-light bg-light shadow-sm">
          <div className="container d-flex justify-content-between">
            <Link to="/" className="logo d-flex align-items-center">
              <strong className="heading-2 mr-5 pr-5">
                <i className="fas fa-home"></i>House Rental
              </strong>
            </Link>

            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Button color="primary" onClick={()=>navigate('/developers')}>Developers</Button>

                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open1 ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open1 ? "true" : undefined}
                  >
                    {!firstLetter ? (
                      <PersonIcon color="primary" />
                    ) : (
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {firstLetter}
                      </Avatar>
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open1}
                onClose={handleClose1}
                onClick={handleClose1}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {logedin === true ? null : (
                  <MenuItem onClick={handleLogIn}>
                    <ListItemIcon>
                      <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    Log in
                  </MenuItem>
                )}
                {logedin === true ? null : (
                  <MenuItem onClick={handleSignUp}>
                    <Avatar />
                    Sign up
                  </MenuItem>
                )}
                {role.includes("admin") ? (
                  <MenuItem onClick={handleHost}>Host your Home</MenuItem>
                ) : null}
                {role.includes("admin") ? (
                  <MenuItem onClick={handleMyHost}>My Hosts</MenuItem>
                ) : null}
                {role.includes("user") ? (
                  <MenuItem onClick={handleMyReservation}>
                    My Reservation
                  </MenuItem>
                ) : null}
                {role.includes("user") ? (
                  <MenuItem onClick={handleMyProfile}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                ) : null}

                {role.includes("ADMIN") ? (
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    UserList
                  </MenuItem>
                ) : null}
                {logedin === false ? null : (
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                )}
              </Menu>
            </React.Fragment>
          </div>
        </div>
      </header>
    </>
  );
}
