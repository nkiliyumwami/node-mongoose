const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

//Create a url and connect to mongoDB
const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
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
        console.log(campsite); //This log the original doc before update
        //Update a campsite
        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: {description: 'Updated Test Document'}
        }, {
            new: true // This to return the updated document
        });
    })
    .then(campsite => {
        console.log(campsite) //This log the updated document
        //Add a subdocument(comment)
        campsite.comments.push({
            rating: 5,
            text: 'What a magnificient view!',
            author: 'Tinus Lorvaldes'
        });
        //Save the subdocument
        return campsite.save();
    })
    .then(campsite => {
        console.log(campsite);
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