const express = require("express");
const axios = require("axios");

const router = express.Router();
const BASE_URL = "https://api.tvmaze.com";

/**
 * GET /api/schedule/web
 * Optional query: ?country=US
 */
router.get("/web", async (req, res) => {
  try {
    const { country } = req.query;

    const url = country
      ? `${BASE_URL}/schedule/web?country=${country}`
      : `${BASE_URL}/schedule/web`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch web schedule" });
  }
});

module.exports = router;
