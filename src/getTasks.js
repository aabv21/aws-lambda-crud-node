const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getTasks = async (event) => {
  const result = await dynamoDb.scan({ TableName: "TaskTable" }).promise();
  return {
    status: 200,
    body: result.Items,
  };
};

module.exports = {
  getTasks,
};
