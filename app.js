const express =require('express');
const bodyparser=require('body-parser');
const request= require('request');
const app=express();
const mongoose=require('mongoose');
const puppeteer = require('puppeteer');

app.use(express.json());
const PORT = process.env.PORT || 3000;


app.use(express.static("css"));
app.use(bodyparser.urlencoded({extended: true}));

 mongoose.connect('mongodb+srv://naman05:9929992256^Ns@cluster0.biv2rt9.mongodb.net/infodb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://naman05:9929992256^Ns@cluster0.biv2rt9.mongodb.net/infodb?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("naman05").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const uri = 'mongodb+srv://naman05:9929992256^Ns@cluster0.biv2rt9.mongodb.net/infodb?retryWrites=true&w=majority';

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//     // Start your application or perform database operations
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB Atlas:', error);
//   });

// const database = (module.exports = () => {
//   const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };
//   try {
//      mongoose.connect(
//       "mongodb+srv://naman05:9929992256^Ns@cluster0.biv2rt9.mongodb.net/infodb?retryWrites=true&w=majority",
//       connectionParams
//     );
//     console.log("Database connected succesfully");
//   } catch (error) {
//     console.log(error);
//     console.log("Database connection failed");
//   }
// });

// database();


app.get('/',function(req,res)
{
    res.sendFile('/index.html');
});
app.get('/order',function(req,res)
{
    res.sendFile(__dirname +'/css/order.html');
});


const infoshcem= new mongoose.Schema(
  {
   name: {
     type: String,
     
   },
   email: {
     type: String,
     
     
   },
   phoneNumber: {
     type: String,
     
   },
   message: {
     type: String,
     maxlength: 200,
     
   }
  }
);
const dishschema=new mongoose.Schema({
id: Number,  
name: String,
Price: Number

});

const orderschema=new mongoose.Schema({
Dish: dishschema
});
const  dishe=mongoose.model('dishe',dishschema);
// const a= new dishe({
//     id: 1001,
//     name: "Dish 1",
//     Price: 10
// });
//  a.save();
 dishe.insertMany([{
  id: 1002,
  name: "Dish 2",
  Price: 12
},
{
  id: 1003,
  name: "Dish 3",
  Price: 8
},
{
  id: 1004,
  name: "Dish 4",
  Price: 15
},
{
  id: 1005,
  name: "Dish 5",
  Price: 9
},
{
  id: 1006,
  name: "Dish 6",
  Price: 19
}]);


const order=mongoose.model('order',orderschema);
const detail=mongoose.model('detail',infoshcem);
app.post('/data', (req, res) => {
  const receivedData = req.body;
  console.log('Data received on the server:', receivedData.name);
  const diis=dishe.find({name: receivedData.name});
  const keep=new order({
    Dish: diis
  });
  keep.save();
  
  
  // Send a response back to the client
  res.json({ message: 'Data received successfully' });
});
app.post('/',async function(req,res) 
{  
     const  n=req.body.name;
    const e=req.body.email;
    const p=req.body.phone;
    const m=req.body.message;
    console.log(n);
    const person= new detail({
      name: n,
      email: e,
      phone: p,
      message: m,
    });
    try{
     await person.save();
}
    finally{
    res.redirect('/');}
    
});






app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server Started at Port ${PORT}`)
});