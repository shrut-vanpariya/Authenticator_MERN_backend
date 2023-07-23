const mongoose = require('mongoose');
require('dotenv').config();

// const DB = 'mongodb+srv://shrutvanpariya:<password>@cluster0.0xa1ijt.mongodb.net/<dbname>?retryWrites=true&w=majority'
const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => { console.log("DataBasee Connected!"); }).catch((err) => {
    console.log(err);
})