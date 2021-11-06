import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
};

function addQueueItem(stationId, newQueueItem) {
  const url = `/partydj/api/v1/queue/${stationId}/queue-item`;
  return axios.post(url, newQueueItem);
}

function clearQueue(stationId) {
  const url = `/partydj/api/v1/queue/${stationId}/delete-queue`;
  return axios.delete(url);
}

function ended(stationId, id) {
  const url = `/partydj/api/v1/queue/${stationId}/queue-item/played/${id}`;
  return axios.put(url, {});
}

function getCurrentVideo(stationId) {
  const url = `/partydj/api/v1/queue/${stationId}/current-item`;
  return axios.get(url);
}

function retrieveQueue(stationId) {
  const url = `/partydj/api/v1/queue/${stationId}/queue-item`;
  return axios.get(url);
}

const queueItemService = {
  addQueueItem,
  clearQueue,
  ended,
  getCurrentVideo,
  retrieveQueue,
};

export default queueItemService;
