const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const app = express();
const { default: axios } = require("axios");

const posts = {};

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts/create", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  axios
    .post("http://e-bus-service:4005/events", {
      type: "PostCreated",
      data: { id, title },
    })
    .catch((err) => console.log(err));
  return res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Recieved", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
