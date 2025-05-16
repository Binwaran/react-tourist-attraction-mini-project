import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import trips from "./db.js";

const app = express();
const port = 4001;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/trips", (req, res) => {
  let keywords = req.query.keywords;

  // ถ้าไม่ส่ง keywords มาเลย → ส่ง trips ทั้งหมด
  if (!keywords) {
    return res.json({
      data: trips,
    });
  }

  // ถ้ามี keywords → ใช้ regex filter
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

// เพิ่ม route สำหรับ /trips/:id
app.get("/trips/:id", (req, res) => {
  const id = req.params.id;
  const result = trips.find((trip) => trip?.eid?.toString() === id);

  if (!result) {
    return res.status(404).json({ message: "Trip not found" });
  }

  return res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
