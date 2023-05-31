const { Connection } = require("../mongodb");

// open connection to mongo db - will be called with Connection.db
const connectToDB = () => Connection.open();

const getTodos = async (req, res) => {
  console.log("responded to GET request from conrollers");
  const cursor = await Connection.db
    .db("react-todo")
    .collection("guest")
    .find();
  const todos = await cursor.toArray();
  todos.sort((a, b) => b.date - a.date); // sort by date - newest on top
  res.status(200).send(JSON.stringify(todos, null, 3)); // maybe change to {status: success, data: todos}
  console.log("Fetched todos successfully");
};

const addTodo = async (req, res) => {
  console.log("responded to POST request");
  const newTodo = req.body;
  console.log(JSON.stringify(newTodo, null, 3));
  const result = await Connection.db
    .db("react-todo")
    .collection("guest")
    .insertOne(newTodo);
  console.log(`new todo added with id : ${result.insertedId}`);
  res.status(200).end();
};

const toggleChecked = async (req, res) => {
  console.log("responded to PUT request");
  const { date, changeTo } = req.body;
  console.log(`UPDATE ONE - date: ${date} , change to: ${changeTo}`);
  const result = await Connection.db
    .db("react-todo")
    .collection("guest")
    .updateOne({ date: date }, { $set: { checked: changeTo } });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
  res.status(200).end();
};

const deleteTodo = async (req, res) => {
  console.log("responded to DELETE request");
  const { date } = req.body;
  console.log(`DELETE ONE - date: ${date} `);
  const result = await Connection.db
    .db("react-todo")
    .collection("guest")
    .deleteOne({ date: date });
  console.log(`${result.deleteCount} document(s) were deleted.`);
  res.status(200).end();
};

module.exports = {
  connectToDB,
  getTodos,
  addTodo,
  toggleChecked,
  deleteTodo,
};
