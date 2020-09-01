const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "media/uploads");
  },
  filename: (req, res, cb) => {
    cb(null, file.originalname, replace(/ /g, "_")); //use regex to replace whitespace with an underscore.
  },
});

const upload = multer({
  storage: storage,
  limites: {
    fileSize: 1024 * 1024 * 50, // This is 50MB
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  res.status(200).send({ msg: "Video Upload Successful" });
});

module.exports = router;
