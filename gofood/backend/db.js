const mongoose = require('mongoose');
mongoURI = 'mongodb+srv://Karthik:Karthik25@cluster0.prkvbwg.mongodb.net/gofood?retryWrites=true&w=majority&appName=AtlasApp'
mongoose.set('strictQuery', true);
const mongoDB = async() => {
   await mongoose.connect(mongoURI,{useNewUrlParser: true},()=>{
        console.log("Connected successfully...");

        //this code is for fetching data from atlas db
        const fetched_data = mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray( async function(err,data){
            const foodCategory = await mongoose.connection.db.collection("food_category");
            foodCategory.find({}).toArray(function(err,catData){
                if(err) console.log(err);
                else {
                    global.food_items = data;
                    global.foodCategory = catData;
                }
            })

            // if(err) console.log(err);
            // else {
            //     global.food_items = data;
            // }
        })
    });
    
}

module.exports = mongoDB;

