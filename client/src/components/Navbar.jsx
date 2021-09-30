import { AppBar, Button, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {useHistory} from "react-router-dom"

function Navbar() {
  const history = useHistory();
  // const [active, setActive] = useState("");
  const [admin, setAdmin] = useState('')
  const [customer, setCustomer] = useState('')
  // const [user, setUser] = useState();


  useEffect(() => {
    console.log("render")
    const user = AuthService.getCurrentUser();
    if(user){
      console.log(user);
      setAdmin(user.roles.includes("ROLE_ADMIN"))
      setCustomer(user.roles.includes("ROLE_USER"))
    }
  },[])

  const logOut = () => {
    AuthService.logout();
    history.push("/login")
    window.location.reload();
  }

  return (
    <AppBar
      sx={{
        position: "sticky",
        background: "lightblue",
      }}
    >
      <Tabs
        className="tabs"
        sx={{
          "& .tab": { color: "black", fontSize: "16px", fontWeight: 600 },
          "& .button": {
            color: "purple",
            fontSize: "16px",
            fontWeight: 600,
            margin: 1,
            width: "120px",
          },
          "& .active-tab": { background: "red" },
          "& .tab:hover": { color: "red" },
          "& .button:hover": { color: "red" },
        }}
      >
        <Tab className="tab" sx={{color:"white", background:"coral"}} label="ATBS" component={Link} to="/" />
        <Tab className="tab" label="Home" component={Link} to="/home" />
        {admin && (
          <Tab className="tab" label="Airline" component={Link} to="/airline" />
        )}
        {admin && (
          <Tab className="tab" label="Airport" component={Link} to="/airport" />
        )}
        {admin && (
          <Tab className="tab" label="Flight" component={Link} to="/flight" />
        )}
        {customer && (
          <Tab
            className="tab"
            label="Book Flight"
            component={Link}
            to="/customer/book_flight"
          />
        )}
        {customer && (
          <Tab
            className="tab"
            label="My Bookings"
            component={Link}
            to="/customer/my_booking"
          />
        )}
        { !admin && !customer &&
        <Tab className="tab" label="Search Flights" component={Link} to="/search_flight" />}
        {/* <Tab className="tab" label="About" component={Link} to="/about" /> */}
        <Tab
          className="tab"
          label="Contact Us"
          component={Link}
          to="/contact"
        />
        {(!customer && !admin) &&
        <Tab
          className="tab right"
          label="Sign In"
          component={Link}
          to="/login"
        />
        } 
        
        {(customer || admin) && (
          <Button
            className="button right"
            startIcon={<LogoutOutlinedIcon />}
            component={Link}
            
            label="Logout"
            onClick={() => logOut()}
          >
            Logout
          </Button>
        )}
      </Tabs>
    </AppBar>
  );
}

export default Navbar;
