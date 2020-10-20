const functions = require("firebase-functions");
const app = require("express")();
const cors = require('cors');

const FBAuth = require("./util/fbAuth");
const { getUsers, signup, signout } = require("./handlers/users");
app.use(cors());

app.post("/signup", signup);
app.post("/signout", signout);
// app.post("/phone-number-login", login);
// app.get("/users", FBAuth, getUsers);
app.get("/users", getUsers);

exports.api = functions.https.onRequest(app);
