const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // your db password
  database: "test",
});

app.get("/", (req, res) => {
  res.json("H1");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO `test`.`books` (`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully!");
  });
});

app.put("/books/:id", (req, res) => {
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?";
  const id = req.params.id;
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully!");
  });
});

app.delete("/books/:id", (req, res) => {
  const q = "DELETE FROM books WHERE id = ?";
  const id = req.params.id;

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully!!");
  });
});
app.listen(8800, () => {
  console.log("Listening on port 8800...");
});
