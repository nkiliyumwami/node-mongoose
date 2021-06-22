const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a schema
const campsiteSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
});

//Create a model
const Campsite = mongoose.model('Campsite', campsiteSchema);

//Export the model/module 
module.exports = Campsite;
