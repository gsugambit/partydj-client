import axios from "../util/AxiosIntercepted";

function create(newStation) {
  const url = `/partydj/api/v1/station`;
  return axios.post(url, newStation);
}

function getAllStations() {
  const url = `/partydj/api/v1/station`;
  return axios.get(url);
}

function retrieveStation(stationUrl) {
  const url = `/partydj/api/v1/station/url/${stationUrl}`;
  return axios.get(url);
}

function deleteStation(id) {
  const url = `/partydj/api/v1/station/${id}`;
  return axios.delete(url);
}

const stationService = {
  create,
  deleteStation,
  getAllStations,
  retrieveStation,
};

export default stationService;
