const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getTask = async (event) => {
  const { id } = event.pathParameters;
  const result = await dynamoDb
    .get({ TableName: "TaskTable", Key: { id } })
    .promise();

  return {
    status: 200,
    body: result.Item,
  };
};

module.exports = {
  getTask,
};
