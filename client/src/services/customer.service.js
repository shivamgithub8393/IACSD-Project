import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/customer/";

class CustomerService {
  getFlights() {
    return axios.get(API_URL + "flights", { headers: authHeader() });
  }

  searchFlightsBetweenAirports(data) {
    return axios.post(API_URL + "flights/search", data, {
      headers: authHeader(),
    });
  }

  bookFlight(data) {
    return axios.post(API_URL + "book_flight", data, { headers: authHeader() });
  }

  getBooking(id) {
    return axios.get(API_URL + "show_booking/" + id, {
      headers: authHeader(),
    });
  }

  cancelReservation(data) {
    console.log(data)
    return axios.post(API_URL + "cancel_reservation", data, {
      headers: authHeader(),
    });
  }
}

export default new CustomerService();
