const express = require("express");
const bodyparser = require("body-parser");
const readDatabase = require("./readDatabase");
const jsonparser = bodyparser.json();

// Creating express object
const app = express();
readDatabase.readDatabase();

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Handling GET request
app.get("/", (req, res) => {
  res.send("A simple Node App is " + "running on this server");
  res.end();
});

app.post("/ipaddress", jsonparser, (req, res, next) => {
  if (!req.body.ip) {
    return res.status(400).json({
      status: "error",
      error: "req body cannot be empty",
    });
  } else {
    const IPData = readDatabase.getinformation(req.body.ip);
    if (IPData == "" || IPData == undefined) {
      res.status(500).json({ message: "IP Not Found" });
      console.log("Not Found")
    } else {
      res.status(200).json({ message: "IP Found", data: IPData });
      console.log("Found")
    }
  }
});

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, console.log(`Server started on port ${PORT}`));
