// putUser.js
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log("putUser event:", event);

    const body = JSON.parse(event.body || "{}");
    const id = uuidv4(); // Generate unique ID

    const newUser = {
        id,
        username: body.username,
        email: body.email,
    };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: newUser,
        };

        await dynamo.put(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify(newUser),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Could not create user" }),
        };
    }
};