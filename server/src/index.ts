import express from "express";

const server = express();
const PORT = process.env.SERVER_PORT || 5000;

server.get("/", (_, res) => {
  res.send("Status: 200");
});

server.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
