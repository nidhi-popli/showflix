const router = require("express").Router();
const { searchShows } = require("../services/tvmazeService");

router.get("/", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);

  const data = await searchShows(q);
  res.json(data);
});

module.exports = router;
