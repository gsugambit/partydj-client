import axios from "axios";

function addQueueItem(newQueueItem) {
    const url = 'http://192.168.86.29:8080/api/v1/queue/queue-item';
    return axios.post(url, newQueueItem);
}

function clearQueue() {
    const url = 'http://192.168.86.29:8080/api/v1/queue/delete-queue';
    return axios.delete(url);
}

function ended(id) {
    const url = `http://192.168.86.29:8080/api/v1/queue/queue-item/played/${id}`;
    const headers = {
        'content-type': 'application/json'
    }
    return axios.put(url, {}, { headers });
}

function getCurrentVideo() {
    const url = 'http://192.168.86.29:8080/api/v1/queue/current-item';
    return axios.get(url);
}

function retrieveQueue() {
    const url = 'http://192.168.86.29:8080/api/v1/queue/queue-item';
    return axios.get(url);
}

export default {
    addQueueItem,
    clearQueue,
    ended,
    getCurrentVideo,
    retrieveQueue
}