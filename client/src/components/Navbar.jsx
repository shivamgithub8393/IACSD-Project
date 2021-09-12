import React, { Component } from "react";
import { AppBar, Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <AppBar color="primary" position="relative">
        <Tabs className="tabs">
          <Tab
            style={{ fontWeight: "lighter" }}
            className="tab"
            label="Home"
            component={Link}
            to="/"
          />

          <Tab
            style={{ fontWeight: "lighter" }}
            className="tab"
            label="About"
            component={Link}
            to="/about"
          />
          <Tab
            style={{ fontWeight: "lighter" }}
            className="tab"
            label="Contact Us"
            component={Link}
            to="/contact"
          />
          <Tab
            style={{ fontWeight: "lighter" }}
            className="tab"
            label="Sign In"
            component={Link}
            to="/login"
          />
          <Tab
            style={{ fontWeight: "lighter" }}
            className="tab"
            label="Sign up"
            component={Link}
            to="/register"
          />
        </Tabs>
      </AppBar>
    );
  }
}

export default withRouter(Navbar);
