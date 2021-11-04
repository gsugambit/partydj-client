import axios from "axios";

const partyDjServerDomain = process.env.REACT_APP_PARTYDJ_SERVER_DOMAIN;

function create(newStation) {
  const url = `${partyDjServerDomain}/api/v1/station`;
  return axios.post(url, newStation);
}

function getAllStations() {
  const url = `${partyDjServerDomain}/api/v1/station`;
  return axios.get(url);
}

function retrieveStation(id) {
  const url = `${partyDjServerDomain}/api/v1/station/${id}`;
  return axios.get(url);
}

export default {
  create,
  getAllStations,
  retrieveStation,
};
