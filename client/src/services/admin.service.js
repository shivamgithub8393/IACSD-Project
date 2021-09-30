import axios from "axios";
import authHeader from "./auth.header"

const API_URL = "http://localhost:8080/admin/";

class AdminService {
  getAirports() {
    return axios.get(API_URL + "airports", { headers: authHeader() });
  }

  getFlights() {
    return axios.get(API_URL + "flights", { headers: authHeader() });
  }

  getAirlines() {
    return axios.get(API_URL + "airlines", { headers: authHeader() });
  }

  addAirport(data) {
    return axios.post(API_URL + "airport/add", data, { headers: authHeader() });
  }

  deleteAirport(airportId) {
    return axios.delete(API_URL + "airport/delete/" + airportId, {
      headers: authHeader(),
    });
  }

  addAirline(data) {
    return axios.post(API_URL + "airline/add", data, { headers: authHeader() });
  }

  deleteAirline(airlineId) {
    return axios.delete(API_URL + "airline/delete/" + airlineId, {
      headers: authHeader(),
    });
  }

  addFlight(data) {
    return axios.post(API_URL + "flight/add", data, { headers: authHeader() });
  }

  deleteFlight(flightId) {
    return axios.delete(API_URL + "flight/delete/" + flightId, {
      headers: authHeader(),
    });
  }

  updateFlight(flightId, data) {
    return axios.put(API_URL + "flight/update/"+ flightId, data, {
      headers: authHeader(),
    });
  }
}

export default new AdminService();
