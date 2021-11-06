import axios from "../util/AxiosIntercepted";

function create(newStation) {
  const url = `/partydj/api/v1/station`;
  return axios.post(url, newStation);
}

function getAllStations() {
  const url = `/partydj/api/v1/station`;
  return axios.get(url);
}

function retrieveStation(id) {
  const url = `/partydj/api/v1/station/${id}`;
  return axios.get(url);
}

const stationService = {
  create,
  getAllStations,
  retrieveStation,
};

export default stationService;
