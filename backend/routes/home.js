const express = require("express");
const router = express.Router();

const {
  getTodos,
  addTodo,
  toggleChecked,
  deleteTodo,
} = require("../controllers/home");

router
  .route("/")
  .get(getTodos)
  .post(addTodo)
  .put(toggleChecked)
  .delete(deleteTodo);

module.exports = router;
