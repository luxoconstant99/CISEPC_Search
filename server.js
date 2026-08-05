const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.static(__dirname));

const client = new MongoClient(process.env.MONGODB_URI);
async function start() {

    await client.connect();

    const db = client.db("cisePC");
    const collection = db.collection("recherches");

    app.get("/data", async (req, res) => {

        const data = await collection.find().toArray();

        res.json(data);

    });

    app.listen(3000, () => {

        console.log("CISEPC fonctionne sur http://localhost:3000");

    });

}

start();