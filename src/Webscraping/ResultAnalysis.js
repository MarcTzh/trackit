const data = require('./Data');
const { mongoURI } = data;

const mongoose = require('mongoose');
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("MONGODB connected"))
    .catch(err => console.log(err));

const compareAndSaveResults = dataObj => {
    try {
        const Price = require("./Prices");

        const newPrice = new Price(dataObj);
        return newPrice.save().catch(err => console.log(err));
    } catch(err) {
        console.log(err);
    }
};

module.exports = compareAndSaveResults;