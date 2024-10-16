const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then((res)=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    //deleting the already existing data in listing model
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);   //we have exported an object so here we want to access the key value (i.e data) of the data in data.js file
    console.log("data was initialized");

}

initDB();