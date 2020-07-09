const lazada = require('./Lazada.js');
const q10 = require('./q10.js');
const amazon = require('./AmazonParser.js');

async function checkPrice(url) {
    if(url.includes('amazon')) {
        return amazon.checkAmazonPrice(url);
    } else if(url.includes('lazada')) {
        return lazada.checkLazadaPrice(url);
    } else if(url.includes('qoo10')) {
        return q10.checkQ10Price(url);
    } else {
        return null;
    }
}

exports.checkPrice = checkPrice;