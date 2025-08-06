import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;
dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTable = async () => {
  const profileQuery = `
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      url VARCHAR,
      about TEXT,
      bio TEXT,
      location VARCHAR,
      followerCount VARCHAR,
      connectionCount VARCHAR,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const interactionsQuery = `
    CREATE TABLE IF NOT EXISTS interactions (
      id SERIAL PRIMARY KEY,
      urn TEXT,
      postUrl TEXT,
      author TEXT,
      content TEXT,
      action VARCHAR,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  await pool.query(profileQuery);
  await pool.query(interactionsQuery);
};

app.post("/api/profiles", async (req, res) => {
  const { name, url, about, bio, location, followerCount, connectionCount } = req.body;
  try {
    const query = `
      INSERT INTO profiles (name, url, about, bio, location, followerCount, connectionCount)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [name, url, about, bio, location, followerCount, connectionCount];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error saving profile:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/interactions", async (req, res) => {
  const { interactions } = req.body;
  try {
    const insertPromises = interactions.map(({ urn, postUrl, author, content, action }) => {
      const query = `
        INSERT INTO interactions (urn, postUrl, author, content, action)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [urn, postUrl, author, content, action];
      return pool.query(query, values).catch((err) =>
        console.error("❌ DB Insert Error:", err.message)
      );
    });

    await Promise.all(insertPromises);
    res.json({ message: "Interactions saved successfully." });
  } catch (err) {
    console.error("Error saving interactions:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, async () => {
  await createTable();
  console.log(`Server running on port ${port}.`);
});
