const express = require("express");
const db = require("./config/db");
const auth = require("./config/auth");

const app = express();

const PORT = process.env.PORT || 3000;

db.connect((err) => {
  if (err) console.log("Connection Error" + err);
  console.log(" Connected to Database");
});

app.use(express.json());

app.post("/signup", (req, res) => {
  auth.signup(req.body).then((response) => {
    if (response.addStatus) res.send("response success").status(200);
  });
});

app.post("/signin", (req, res) => {
  if (Object.keys(req.body).length == 0) return;
  auth.signin(req.body).then((response) => {
    if (response.status) res.send(response.user).status(200)
    else {
      res.send("user not authenticated").status(500)
    }
  });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
