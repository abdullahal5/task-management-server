const express = require('express')
const app = express()
require("dotenv").config()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require("mongodb");


app.use(
  cors({
    origin: ["https://sdfaspremium-class.surge.sh", "http://localhost:5173"],
  })
);
app.use(express.json())

app.get("/", (req, res) =>{
    res.send("Hello From task management")
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zelnjpd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const taskCollection = client.db('taskManagement').collection('tasks')

    app.post('/tasks', async (req, res) =>{
        const body = req.body;
        const result = await taskCollection.insertOne(body);
        res.send(result)
    })
    app.get('/tasks/:email', async(req, res) =>{
        const result = await taskCollection.find().toArray()
        res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Hostel and Meals is running on port ${port}`);
});
