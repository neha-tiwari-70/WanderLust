const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");    //our listingSchema file 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");   //used for templating 

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
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);  //using ejs-mate package for templating
app.use(express.static(path.join(__dirname, "/public")));
 
app.get("/", (req,res)=>{
    res.send("Hi, I am root");
});

// for inserting and saving a sample listing in our model
// app.get("/testListing", async(req,res)=>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the beach",
//         price : 1200,
//         location : "Calangute, Goa",
//         country : "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing ");
// });


// INDEX ROUTE - display all listings
app.get("/listings", async(req,res)=>{
    let allListing = await Listing.find();
    // console.log(allListing);
    // res.send("listing is printed in the console.");
    res.render("listings/index.ejs", {allListing});
});  


// NEW ROUTE - serves a new listing form for creating 
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});


// CREATE ROUTE - add created listing to db
app.post("/listings", async(req,res)=>{
    // 1st method to get data from req.body -> let {title, description, image, price, location, country} = req.body;
    // 2nd method -> let listing = req.body.listing;
    // req.body.listing - gets the object which we created for each key in new.ejs 
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    console.log(newlisting);
    res.redirect("/listings");   //only route name and not file name
});

// EDIT ROUTE - serves the edit form
app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;   //add urlencoded 
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

// UPDATE ROUTE - upadate value in the db
app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});       //deconstructing the values from the req body
    res.redirect(`/listings/${id}`);
});

//DELETE ROUTE - delete the data by id
app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// SHOW ROUTE  - show data of a listing by id
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});

});





app.listen(8080,()=>{
    console.log("app is listening to port 8080");
});

