import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useRef } from "react";
import Header from "../../common/header";
import {instance} from "../../index"

export default function ReservationList() {
  const [property, setProperty] = React.useState([]);
  const [jwt, setJwt] = useState();
  const [status,setStatus] = useState([]);
  const spanElement = useRef();

  useEffect(() => {
    const parsedJwt = JSON.parse(localStorage.getItem("jwt"));
    setJwt(parsedJwt);
    const user = JSON.parse(localStorage.getItem('user'))
    const email = user.email;
    instance
      .get("/reservation/"+email,{
        headers: {
          Authorization: "Bearer " + parsedJwt,
        }
      })
      .then((response) => {
        setProperty(response.data);
        for (const pr in response.data){
            status.push('checkout');
        };
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Header/>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          bgcolor: "background.paper",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <nav aria-label="secondary mailbox folders">
          <List>
            <Typography variant="h4" mb={1}>List of Reservation</Typography>

            <ListItem disablePadding>
            <ListItemText primary="id" />
              <ListItemText primary="Start Date" />
              <ListItemText primary="End Date" />
            <ListItemButton>
              <ListItemText primary="Action" />
            </ListItemButton>
          </ListItem>
          <Divider />
            {property.length > 0
              ? property.map((row, idx) => {
                  return (
                    <div key={row.id}>
                      <ListItem  disablePadding>
                        <ListItemText secondary={idx + 1} />
                        {row.startDate}
                        <ListItemText />
                        {row.endDate}
                        <ListItemText />
                        <ListItemButton
                          onClick={(event) => {
                        
                            instance
                              .post(
                                "/property/updateStatus",
                                {
                                  id: row.id
                                },
                                {
                                  headers: {
                                    Authorization: "Bearer " + jwt,
                                  },
                                }
                              )
                              .then((response) => {
                                let prev = [...status];
                                prev[idx] = "Checked Out";
                                setStatus(prev);
                              })
                              .catch((err) => console.log(err));
                          }}
                        >
                          <ListItemText primary={status[idx]} ref={spanElement} id={idx}/>
                          
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })
              : null}
          </List>
        </nav>
      </Box>
    </>
  );
}
