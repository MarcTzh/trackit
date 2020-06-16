const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    price: {
        type: Number
    }
});

module.exports = mongoose.model("Price", priceSchema);