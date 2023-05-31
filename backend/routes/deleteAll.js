const express = require("express");
const router = express.Router();

const { deleteAll } = require("../controllers/deleteAll");

router.route("/").delete(deleteAll);

module.exports = router;
