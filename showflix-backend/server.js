const express = require("express");
const cors = require("cors");

const scheduleRoutes = require("./routes/schedule");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/schedule", scheduleRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
