const data = require('./Data');
const { pageURL } = data;

const webscraping = require('./Webscraping');
const compareAndSaveResults = require('./ResultAnalysis');

webscraping(pageURL)
    .then(dataObj =>  {
        compareAndSaveResults(dataObj);
    })
    .catch(console.error);