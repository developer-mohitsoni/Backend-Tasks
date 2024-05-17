var express = require("express");
var router = express.Router();

const multer = require("multer");

const storage = multer.memoryStorage();

const { s3Uploadv2 } = require("../s3Service");

const upload = multer({ storage });

router.post("/upload", upload.array("file"), async (req, res) => {
  //? To upload only single files
  //* const file = req.files[0];

  //* To upload multiple files as:-

  try {
    const results = await s3Uploadv2(req.files);
    console.log(results);
    return res.json({ status: "Success"});
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
