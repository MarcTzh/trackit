const lazada = require('./Lazada');
const q10 = require('./q10 ');
const amazon = require('./AmazonParser');

async function checkPrice(url) {
    if(url.contains('amazon')) {
        return amazon.checkAmazonPrice(url);
    } else if(url.contains('lazada')) {
        return lazada.checkLazadaPrice(url);
    } else if(url.contains('qoo10')) {
        return q10.checkQ10Price(url);
    } else {
        return null;
    }
}

exports.checkPrice = checkPrice;