import React from "react";
import { AppBar, Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs className="tabs">
          <Tab className="tab" label="Home" component={Link} to="/" />

          <Tab className="tab" label="About" component={Link} to="/about" />
          <Tab
            className="tab"
            label="Contact Us"
            component={Link}
            to="/contact"
          />
          <Tab className="tab" label="Sign In" component={Link} to="/login" />
          <Tab
            className="tab"
            label="Sign up"
            component={Link}
            to="/register"
          />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default Navbar;
