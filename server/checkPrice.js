const lazada = require('./Lazada');
const q10 = require('./q10');
const amazon = require('./AmazonParser');

async function checkPrice(url) {
    console.log(url);
    if(url) {
        try {
            if(url.includes('amazon')) {
                return amazon.checkAmazonPrice(url);
            } else if(url.includes('lazada')) {
                return lazada.checkLazadaPrice(url);
            } else if(url.includes('qoo10')) {
                return q10.checkQ10Price(url);
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log('invalid url');
        return null;
    }
}

// checkPrice("https://www.amazon.com/dp/B07G7PMVR9/ref=dp_cerb_2")

exports.checkPrice = checkPrice;