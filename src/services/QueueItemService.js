import axios from "axios";

const partyDjServerDomain = process.env.REACT_APP_PARTYDJ_SERVER_DOMAIN;

function addQueueItem(newQueueItem) {
    const url = `${ partyDjServerDomain }/api/v1/queue/queue-item`;
    return axios.post(url, newQueueItem);
}

function clearQueue() {
    const url = `${ partyDjServerDomain }/api/v1/queue/delete-queue`;
    return axios.delete(url);
}

function ended(id) {
    const url = `${ partyDjServerDomain }/api/v1/queue/queue-item/played/${id}`;
    const headers = {
        'content-type': 'application/json'
    }
    return axios.put(url, {}, { headers });
}

function getCurrentVideo() {
    const url = `${ partyDjServerDomain }/api/v1/queue/current-item`;
    return axios.get(url);
}

function retrieveQueue() {
    const url = `${ partyDjServerDomain }/api/v1/queue/queue-item`;
    return axios.get(url);
}

export default {
    addQueueItem,
    clearQueue,
    ended,
    getCurrentVideo,
    retrieveQueue
}