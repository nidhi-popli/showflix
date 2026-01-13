import axios from "axios";

const API = axios.create({
  baseURL: "https://api.tvmaze.com"
});

// HOME – US TV Schedule (optional)
export const getSchedule = (country = "US") =>
  API.get(`/schedule?country=${country}`);

// SEARCH
export const searchShows = (query) =>
  API.get(`/search/shows?q=${query}`);

// EXPLORE – All shows (catalog)
export const getAllShows = (page = 0) =>
  API.get(`/shows?page=${page}`);

// SHOW DETAILS
export const getShowDetails = (id) =>
  API.get(`/shows/${id}`);
