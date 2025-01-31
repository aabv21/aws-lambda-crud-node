const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const deleteTask = async (event) => {
  const { id } = event.pathParameters;
  await dynamoDb.delete({ TableName: "TaskTable", Key: { id } }).promise();
  return {
    status: 200,
    body: { message: "Task deleted successfully" },
  };
};

module.exports = {
  deleteTask,
};
