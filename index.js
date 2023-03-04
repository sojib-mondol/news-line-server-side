const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // getting breaking-news
        app.get('/breaking-news', async(req, res) => {
            //const category = "Breaking News" another option---- step 1 
            const query = {category: "Breaking News"};
            const data = await newsData.find(query).toArray();
            //const breakingnews = data.filter(news => news.category === category) --- step 2
            res.send(data); 
        });

        // getting international-news
        app.get('/international-news', async(req, res) => {
            const query = {category: "International News"};
            const data = await newsData.find(query).toArray();
            res.send(data); 
        });
        // getting Entertainment
        app.get('/entertainment', async(req, res) => {
            const query = {category: "Entertainment"};
            const data = await newsData.find(query).toArray();
            res.send(data); 
        });
        // getting Sports
        app.get('/sports', async(req, res) => {
            const query = {category: "Sports"};
            const data = await newsData.find(query).toArray();
            res.send(data); 
        });
        // getting Regular News
        app.get('/regular-news', async(req, res) => {
            const query = {category: "Regular News"};
            const data = await newsData.find(query).toArray();
            res.send(data); 
        });
        
        
        // getting nes details by ID by usiinf ObjectID
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id)};
            const data = await newsData.findOne(query);
            res.send(data);
        })



    }
    finally{

    }
}
run().catch(console.log);

app.get('/', async(req, res) =>{
    res.send('newsline server is running');
})
app.listen(port, () => console.log(`newsline server running on ${port}`))

