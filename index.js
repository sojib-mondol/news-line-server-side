const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmcxwrx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//console.log(uri);

async function run(){
    try{
        // newsData
        const newsData = client.db('newsline').collection('news');
        

         // getting all news
         app.get('/allnews', async(req, res) => {
            const query = {};
            const data = await newsData.find(query).toArray();
            res.send(data);
        });

         // getting all news
         app.get('/braking-news', async(req, res) => {
            const query = {};
            const data = await newsData.find(query).toArray();
            res.send(data);
        });


    }
    finally{

    }
}
run().catch(console.log);

app.get('/', async(req, res) =>{
    res.send('newsline server is running');
})
app.listen(port, () => console.log(`newsline server running on ${port}`))

