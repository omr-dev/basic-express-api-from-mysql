import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/customers", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "northwind",
  });
  connection.connect((err) => {
    if (err) throw err;
    const sql = "SELECT company, last_name, first_name FROM customers";
    connection.query(sql, (err, records) => {
      if (err) throw err;
      res.send(records);
    });
  });
});

app.listen(port, () => {
  console.log(`Server runs on http://localhost:${port}`);
});
