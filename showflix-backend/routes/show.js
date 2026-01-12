const express = require("express");
const router = express.Router();
const { getShowById } = require("../services/tvmazeService");

router.get("/:id", async (req, res) => {
  try {
    const data = await getShowById(req.params.id);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch show" });
  }
});

module.exports = router;
