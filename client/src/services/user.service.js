import axios from "axios";

const API_URL = "http://localhost:8080/";

class UserService {
  getFlights() {
    return axios.get(API_URL + "flights");
  }
  getFlightById(id) {
    return axios.get(API_URL + "flight/" + id);
  }
  getAirports() {
    return axios.get(API_URL + "airports");
  }
  getAirlines() {
    return axios.get(API_URL + "airlines");
  }

  getFlightsBetweenTwoAirports(data) {
    return axios.post(API_URL + "flights/search", data);
  }
}

export default new UserService();
