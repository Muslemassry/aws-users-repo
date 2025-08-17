// getUser.js
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log("getUser event:", event);

    const { id } = event.pathParameters;

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: { id },
        };

        const data = await dynamo.get(params).promise();

        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "User not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Could not get user" }),
        };
    }
};
