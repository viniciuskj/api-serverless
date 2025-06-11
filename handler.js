import { AWS } from "aws-sdk";
import express from "express";
import serverless from "serverless-http";

const app = express();
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/users/:userId", async (req, res) => {
    const params = {
        TableName: USERS_TABLE,
        key: {
            userId: req.params.userId,
        },
    }

    try {
        const { item } = await dynamoDbClient.get(params).promise();
        if(item) {
            const { userId, name, email } = item;
            res.json({ userId, name, email });
        } else {
            res.status(404).json({ error: "User not found" });
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not retrieve user" });
    }
});

app.post("/users", async (req, res) => {
    const { userId, name, email } = req.body;
    
    const params = {
        TableName: USERS_TABLE,
        Item: {
            userId: userId,
            name: name,
            email: email,
        },
    };

    try {
        await dynamoDbClient.put(params).promise();
        res.json({ userId, name, email })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not create user" });
    }
});

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    })
});

export const handler = serverless(app);
