const axios = require("axios");

const BASE_URL = "https://api.tvmaze.com";

exports.getSchedule = async () => {
  const response = await axios.get(
    `${BASE_URL}/schedule?country=US`
  );
  return response.data;
};

exports.getShowById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/shows/${id}`
  );
  return response.data;
};
exports.searchShows = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/search/shows?q=${query}`
  );
  return res.data;
};
exports.getWebSchedule = async () => {
  const res = await axios.get(
    `${BASE_URL}/schedule/web`
  );
  return res.data;
};

