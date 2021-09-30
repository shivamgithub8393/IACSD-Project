import React, {useState, useEffect} from 'react'
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Search from './pages/customer/Search';
import BookFlight from './pages/customer/BookFight'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import AddAirline from "./pages/admin/airline/AddAirline";
import ShowAirline from "./pages/admin/airline/ShowAirline";
import AddAirport from "./pages/admin/airport/AddAirport";
import ShowAirport from "./pages/admin/airport/ShowAirport";
import AddFlight from "./pages/admin/flights/AddFlight";
import ShowFlight from "./pages/admin/flights/ShowFlights";
import UpdateFlight from "./pages/admin/flights/UpdateFlight";
import Login from "./components/Login";
import MyBooking from './pages/customer/MyBooking';
import AddPassenger from './pages/customer/AddPassenger';
import BookingSuccessPage from './pages/customer/BookingSuccessPage';

class App extends React.Component {
  
  render() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/home"} exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />

        {/* Customer Routes */}
        <Route path={"/customer/booking_success"} exact component={BookingSuccessPage} />
        <Route path={"/search_flight"} exact component={Search} />
        <Route path={"/customer/search_flight"} exact component={Search} />
        <Route path="/customer/book_flight" exact component={BookFlight} />
        <Route path="/customer/addPassenger" exact component={AddPassenger} />
        <Route
          path="/customer/my_booking"
          exact
          component={MyBooking}
        />

        {/* Admin Routes */}
        <Route path="/airline" exact component={ShowAirline} />
        <Route path="/airline/add" exact component={AddAirline} />
        <Route path="/airport" exact component={ShowAirport} />
        <Route path="/airport/add" exact component={AddAirport} />
        <Route path="/flight" exact component={ShowFlight} />
        <Route path="/flight/add" exact component={AddFlight} />
        <Route path="/flight/update" exact component={UpdateFlight} />
      </Switch>
    </Router>
  );
}
}

export default App;
