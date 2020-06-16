
// import { checkPrice } from './AmazonParser';
//For each product, update the price of the product in MongoDB

// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
const { useQuery, useMutation } = require('@apollo/react-hooks');
const {gql} = require('apollo-boost');
const React = require('react');
//Amazon Parser
const { checkPrice } = require("./AmazonParser.js");


const REMOVE_CATEGORIES_MUTATION = gql `
    mutation AddProductPrice($id: ID!, $priceArray: [Int!]!) {
        addProductPrice(id: $id, priceArray: $priceArray)
    }
`;

const url = 'https://www.amazon.sg/ASUS-MX34VQ-Curved-Monitor-Dark/dp/B076G3X26M?ref_=s9_apbd_simh_hd_bw_b6tKmeR&pf_rd_r=WEKRF9Q28BVNXK9VJ0QG&pf_rd_p=4176285e-21fd-5c35-ae64-d5444cdbee0e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051';

// async function test(x) {
//   try {
//     const price = await checkPrice(x);
//     console.log(price);
//     return price;
//   } catch (e) {
//     console.log('error in AutorunScript.js: ' + e);
//   }
// }


// test(url);

// console.log(checkPrice(url));

//Product properties to add in schema
//price[10,10,11,12,11]
//date[140620, 150620, 160620]

//currPrice = price[price.length - 1];
//startDate = date[0]


//Script to update price array, add in a new entry everyday
async function test() {
  const price = await checkPrice(url);
  console.log(price);
  // return (
  //   <div>
  //     <h1>`price is {price}`</h1>
  //   </div>
  // );
}

test();


module.exports.test = test;