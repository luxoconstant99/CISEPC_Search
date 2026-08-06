const { MongoClient } = require("mongodb");
const fs = require("fs");

const url = "mongodb+srv://luxoconstant99_db_user:Mackonbi99@cluster0.kuquqis.mongodb.net/cisePC?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);

async function importer() {
    try {
        await client.connect();

        const db = client.db("cisePC");
        const collection = db.collection("recherches");

        const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

        await collection.insertMany(data);

        console.log("Importation réussie !");
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

importer();