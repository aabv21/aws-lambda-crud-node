const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const addTask = async (event) => {
  const { title, description } = event.body;
  const createdAt = new Date().toISOString();
  const id = uuidv4();

  const newTask = { id, title, description, createdAt };
  await dynamoDb
    .put({
      TableName: "TaskTable",
      Item: newTask,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTask),
  };
};

module.exports = {
  addTask: middy(addTask).use(jsonBodyParser()),
};
