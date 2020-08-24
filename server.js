const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// define routes
app.use("/user", require("./routes/user"));

// Heroku config. Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // set static folder
//   app.use(express.static(path.join(__dirname, "client", "build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
