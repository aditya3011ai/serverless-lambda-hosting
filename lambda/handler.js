const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON input" })
    };
  }

  const params = {
    TableName: "ContactForm",
    Item: {
      email: data.email,
      name: data.name,
      message: data.message,
      timestamp: new Date().toISOString()
    }
  };

  try {
    await dynamo.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data stored successfully" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error storing data" })
    };
  }
};
