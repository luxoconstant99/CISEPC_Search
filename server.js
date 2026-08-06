const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const ADMIN_PASSWORD = "CISEPC2026";

app.use(express.static(__dirname));

const client = new MongoClient(process.env.MONGODB_URI);
async function start() 
{
    await client.connect();

    const db = client.db("cisePC");
    const collection = db.collection("recherches");


    // Recherche des données
app.get("/data", async (req, res) => {

    let data = await collection.find().toArray();

    data = data.map(item => {

        if (item.url) {
            item.url = item.url.replace(
                "http://localhost:3000",
                "https://cisepc-search.onrender.com"
            );
        }

        return item;

    });

    res.json(data);

});


    


    // Ajouter une nouvelle donnée
app.post("/ajouter", async (req, res) => {

    const nouvelleDonnee = req.body;

    await collection.insertOne(nouvelleDonnee);

    res.json({
        message: "Ajout réussi !"
    });

});
    app.listen(3000, () => {

        console.log("CISEPC fonctionne sur http://localhost:3000");

    });

}

start();