const { Connection } = require("../mongodb");

const deleteAll = async (req, res) => {
  console.log("responded to DELETE ALL request");
  const result = await Connection.db
    .db("react-todo")
    .collection("guest")
    .drop();
  console.log(`All documents were deleted.`);
  // await getTodos(req, res);
  res.status(200).end();
};

module.exports = { deleteAll };
