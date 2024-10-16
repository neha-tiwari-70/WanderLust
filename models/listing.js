// in this file we have created our main listing model by definig schema and making models
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        //checking if the image is undefined then it provides the default image 
        default : "https://images.unsplash.com/photo-1727200452258-98c642b23519?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
        //checks if the image url is empty by the user then it sets the image then
        set :(v) => v ===""? "https://images.unsplash.com/photo-1727200452258-98c642b23519?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    price : Number,
    location : String,
    country : String,
});

// now using the above schema we make a model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;