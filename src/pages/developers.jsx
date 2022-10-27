import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Header from "../common/header";

import { StaticDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
export default function Developers() {
  const [myState,setMyState] = useState('');
  return (
    
      <div>
        <Header />
        <Grid
          container
          columnGap={3}
          justifyContent="center"
          sx={{ marginTop: 3 }}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Dave" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Dawit Eshetu Meketa"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                     {" Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
                    </Typography>
                  
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Frena " src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Frena Mhretab"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                     {" Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Merhatsidk " src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Merhatsidk Tadesse Ayele"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                     {" Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Nati Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Natnael Teshome Gudeta"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {" Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Selamawit Yilma Woldeyohannes"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {" Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Zedagem Shiferaw Demelash"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    
                      {" Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
                      </Typography>
                    
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </div>
    
  );
}
