import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const Profile = sequelize.define("Profile", {
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  about: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  location: DataTypes.STRING,
  followerCount: DataTypes.STRING,
  connectionCount: DataTypes.STRING,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/profiles", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.json(profile);
  } catch (err) {
    console.error("Error saving profile:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
});
