const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const updateTask = async (event) => {
  const { id } = event.pathParameters;
  const { done, title, description } = JSON.parse(event.body);
  const updatedAt = new Date().toISOString();

  await dynamoDb
    .update({
      TableName: "TaskTable",
      Key: { id },
      UpdateExpression:
        "set done = :done, title = :title, description = :description, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":done": done,
        ":title": title,
        ":description": description,
        ":updatedAt": updatedAt,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify({ message: "Task updated successfully" }),
  };
};

module.exports = {
  updateTask,
};
