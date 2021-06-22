const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

//Create a url and connect to mongoDB
const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//The connect return a promise
connect.then(()=> {
    console.log(`Connected correctly to server`);

    //Create a document and save it(.create do both)
    Campsite.create({
        name: 'React Lake Campground',
        description: 'Test'
    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.find();
    })
    .then(campsites => {
        console.log(campsites);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});