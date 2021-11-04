import axios from "axios";

const partyDjServerDomain = process.env.REACT_APP_PARTYDJ_SERVER_DOMAIN;

function addQueueItem(stationId, newQueueItem) {
  const url = `${partyDjServerDomain}/api/v1/queue/${stationId}/queue-item`;
  return axios.post(url, newQueueItem);
}

function clearQueue(stationId) {
  const url = `${partyDjServerDomain}/api/v1/queue/${stationId}/delete-queue`;
  return axios.delete(url);
}

function ended(stationId, id) {
  const url = `${partyDjServerDomain}/api/v1/queue/${stationId}/queue-item/played/${id}`;
  const headers = {
    "content-type": "application/json",
  };
  return axios.put(url, {}, { headers });
}

function getCurrentVideo(stationId) {
  const url = `${partyDjServerDomain}/api/v1/queue/${stationId}/current-item`;
  return axios.get(url);
}

function retrieveQueue(stationId) {
  const url = `${partyDjServerDomain}/api/v1/queue/${stationId}/queue-item`;
  return axios.get(url);
}

export default {
  addQueueItem,
  clearQueue,
  ended,
  getCurrentVideo,
  retrieveQueue,
};
