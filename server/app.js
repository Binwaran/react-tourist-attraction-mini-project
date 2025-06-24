import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import trips from "./db.js";

const app = express();

// ✅ เปลี่ยนจาก fix port → ดึงจาก process.env
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/trips", (req, res) => {
  let keywords = req.query.keywords;

  if (!keywords) {
    return res.json({
      data: trips,
    });
  }

  const regexKeywords = keywords.split(" ").join("|");
  const regex = new RegExp(regexKeywords, "ig");
  const results = trips.filter((trip) => {
    return (
      trip.title.match(regex) ||
      trip.description.match(regex) ||
      trip.tags.filter((tag) => tag.match(regex)).length
    );
  });

  return res.json({
    data: results,
  });
});

app.get("/trips/:id", (req, res) => {
  const id = req.params.id;
  const result = trips.find((trip) => trip?.eid?.toString() === id);

  if (!result) {
    return res.status(404).json({ message: "Trip not found" });
  }

  return res.json(result);
});

// ✅ ต้องใช้ PORT จาก env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
