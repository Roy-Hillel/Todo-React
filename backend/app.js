const express = require("express");
const app = express();
var cors = require("cors");

const { connectToDB } = require("./controllers/home");
const home = require("./routes/home");
const deleteAll = require("./routes/deleteAll");

connectToDB();

// enable cross origin resource sharing (CORS)
app.use(cors());
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use("/", home);
app.use("/delete", deleteAll);

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
