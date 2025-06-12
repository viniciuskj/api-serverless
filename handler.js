import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import express from "express";
import serverless from "serverless-http";

const app = express();
const USERS_TABLE = process.env.USERS_TABLE;

const client = new DynamoDB({});
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

app.get("/users/:userId", async (req, res) => {
    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: req.params.userId,
        },
    };

    try {
        const { Item } = await dynamoDbClient.send(new GetCommand(params));
        
        if(Item) {
            const { userId, name, email } = Item;
            res.json({ userId, name, email });
        } else {
            res.status(404).json({ error: "User not found" });
        } 
    } catch (error) {
        console.error('Error in GET /users/:userId:', error);
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
        await dynamoDbClient.send(new PutCommand(params));
        res.json({ userId, name, email });
    } catch (error) {
        console.error('Error in POST /users:', error);
        res.status(500).json({ error: "Could not create user" });
    }
});

app.put("/users/:userId", async (req, res) => {
    const { name, email } = req.body;
    const userId = req.params.userId;

    const params = {
        TableName: USERS_TABLE,
        Item: {
            userId: userId,
            name: name,
            email: email,
        },
    };

    try {
        await dynamoDbClient.send(new PutCommand(params));
        res.json({ userId, name, email });
    } catch (error) {
        console.error('Error in PUT /users/:userId:', error);
        res.status(500).json({ error: "Could not update user" });
    }
});

app.get("/users", async (req, res) => {
    console.log("[DEBUG] USERS_TABLE:", USERS_TABLE);
    const params = {
        TableName: USERS_TABLE,
    };

    try {
        console.log("[DEBUG] Scan params:", params);
        const { Items } = await dynamoDbClient.send(new ScanCommand(params));
        console.log("[DEBUG] Scan result:", Items);
        res.json(Items);
    } catch (error) {
        console.error('[ERROR] in GET /users:', error);
        res.status(500).json({ error: "Could not retrieve users", details: error.message, stack: error.stack });
    }
});

app.delete("/users/:userId", async (req, res) => {
    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: req.params.userId,
        }
    }

    try {
        await dynamoDbClient.send(new DeleteCommand(params));
        res.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /user/:userId:', error);
        res.status(500).json({ error: "Could not delete user" });
    }
})

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

export const handler = serverless(app);
