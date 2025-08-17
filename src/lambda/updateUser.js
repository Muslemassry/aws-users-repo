// updateUser.js
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log("updateUser event:", event);

    const body = JSON.parse(event.body || "{}");

    if (!body.id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing user ID" }),
        };
    }

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: { id: body.id },
            UpdateExpression: "set username = :u, email = :e",
            ExpressionAttributeValues: {
                ":u": body.username,
                ":e": body.email,
            },
            ReturnValues: "ALL_NEW",
        };

        const result = await dynamo.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Could not update user" }),
        };
    }
};

