import axios from "../util/AxiosIntercepted";

function search(searchTerm) {
  const url = `/partydj/api/v1/youtube/search?v=${searchTerm}`;
  return axios.get(url);
}

export default {
  search,
};
