const functions = require("firebase-functions");
const app = require("express")();
const cors = require('cors');

const FBAuth = require("./util/fbAuth");
const { getUsers, signup, login } = require("./handlers/users");
app.use(cors());

app.post("/signup", signup);
// app.post("/phone-number-login", login);
// app.get("/users", FBAuth, getUsers);
app.get("/users", FBAuth, getUsers);

exports.api = functions.https.onRequest(app);
