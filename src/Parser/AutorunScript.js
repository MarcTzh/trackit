import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

//price checker
// import checkPrice from '../AmazonParser';
const { checkPrice } = require("./AmazonParser");
// import { checkPrice } from "./AmazonParser";

const url = 'https://www.amazon.sg/ASUS-MX34VQ-Curved-Monitor-Dark/dp/B076G3X26M?ref_=s9_apbd_simh_hd_bw_b6tKmeR&pf_rd_r=WEKRF9Q28BVNXK9VJ0QG&pf_rd_p=4176285e-21fd-5c35-ae64-d5444cdbee0e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051';

// (async function() {
//     console.log(await checkPrice(url));
// })()

const REMOVE_CATEGORIES_MUTATION = gql `
    mutation AddProductPrice($id: ID!, $priceArray: [Int!]!) {
        addProductPrice(id: $id, priceArray: $priceArray)
    }
`;


console.log(checkPrice(url));