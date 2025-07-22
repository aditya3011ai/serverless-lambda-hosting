const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

exports.handler = async (event) => {
  let data;

  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON Format" })
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

    // ✅ Use data.name, data.email, etc.
    const snsParams = {
      Subject: `✅ New Contact Submission from ${data.name}`,
      Message: `You received a new contact form submission:\n\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      TopicArn: 'arn:aws:sns:ap-south-1:814616581944:New-Messgae-From-Serverless-form'
    };

    await sns.publish(snsParams).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({ message: "Data stored and SNS notification sent successfully." })
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};
