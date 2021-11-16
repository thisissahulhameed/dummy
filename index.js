const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const { userModel } = require("./models/user.model");
const { detailModel } = require("./models/details.model");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/pulbic"))
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://user_sahul:FxKHOQlUnwLYIk2h@cluster0.na8ex.mongodb.net/loan_db?retryWrites=true&w=majority",
  {},
  (err) => {
    if (err) {
      console.log(err, "not connected with db");
    } else {
      console.log("db is connected");
    }
  }
);

app.get("/", (req, res) => {
  res.render("index", { error: "" });
});

app.post("/", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let confPassword = req.body.confirmpassword;
  if (password != confPassword) {
    res.render("index.ejs", {
      error: "password must match with confirm password ",
    });
  } else {
    const newUser = new userModel({
      username,
      email,
      password,
    });
    await newUser.save();
    res.render("login", { error: "" });
  }
});

app.get("/login", (req, res) => {
  res.render("login", { error: "" });
});

app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  userModel.findOne({ username: username }).then((user) => {
    if (!user) {
      res.render("login", { error: "username is not found " });
    } else {
      if (password != user.password) {
        res.render("login", { error: "password  is not found " });
      } else {
        res.send("you are authenticated");
      }
    }
  });
});

app.get("/details", (req, res) => {
  res.render("details", { error: "" });
});

app.post("/details", async (req, res) => {
  const newDetails = new detailModel({
    firstname: req.body.f_name,
    lastname: req.body.l_name,
    age: req.body.age,
    fathername: req.body.fathername,
    mothername: req.body.mothername,
    gender: req.body.gender,
    religion: req.body.religon,
    caste: req.body.caste,
    occupation: req.body.occupation,
    aadhar: req.body.aadhar,
    pan: req.body.pan,
    address: req.body.address,
    bank: req.body.bank,
    loan_type: req.body.loan_type,
    loan_amt: req.body.loan_amt,
  });
  await newDetails.save();
  res.render("success");
});

app.listen(port, () => {
  console.log(`server started successfully http://localhost:${port}`);
});
