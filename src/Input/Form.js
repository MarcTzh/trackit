import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import CategoryOptions from '../Input/CategoryOptions'
import UserContext from '../context/UserContext';


const PRODUCTS_QUERY = gql`
{
    products {
        id
        name
        price
        dateArray
    }
}`;

const CREATE_MUTATION = gql`
  mutation CreateProduct($name: String!, $category: String!, $brand: String!, $price: Float!, $url: String!, $minPrice: Int!, $priceArray: [Int!]!, $dateArray: [Int!]!, $userID: String!){
  createProduct(name: $name, category: $category, brand: $brand, price: $price, url: $url, minPrice: $minPrice, priceArray: $priceArray, dateArray: $dateArray, userID: $userID) {
    id
    name
    dateArray
  }
}
`;

const CATEGORIES_QUERY = gql `
{
    categories {
        id
        name  
    }
}`;

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const brandOptions = ['Amazon', 'Shopee', 'Lazada'];

export default function Form() {

  const { loading, error, data } = useQuery(CATEGORIES_QUERY);    
  const classes = useStyles();
  const [createProduct] = useMutation(CREATE_MUTATION);
  const [brandValue, setBrandValue] = useState(brandOptions[0]);
  const [inputBrandValue, setInputBrandValue] = useState('');
  // categoryValue is set to undefined. if user selects and unselects it, it will be set to null. 
  // therefore below categoryValue will check for both undefined and null value
  const [categoryValue, setCategoryValue] = useState();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');

  const { userData } = useContext(UserContext);

  
  //For dates
  const [today, setToday] = useState(new Date());  
  useEffect(() => {
      const interval = setInterval(() => {
          setToday(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  const dateAndTime = (today.getFullYear() - 2000)*100000000 + today.getMonth() * 1000000 + today.getDate() * 10000 + today.getHours()*100 + today.getMinutes();

function handleNameChange(e) {
  const newName = e.target.value;
  setName(newName);
}

function handlePriceChange(e) {
  const newPrice = e.target.value;
  setPrice(newPrice);
}

function handleUrlChange(e) {
  const newUrl = e.target.value;
  setUrl(newUrl);
}

  function handleSubmit() {
    if(brandValue !== null && categoryValue !== null && categoryValue !== undefined && name !== '' && url !== ''){
      createProduct( 
                    {
                      variables: {name: name, 
                                  category: categoryValue, 
                                  brand: brandValue, 
                                  price: 0, 
                                  url: url, 
                                  minPrice: 0,
                                  priceArray:[1], 
                                  dateArray:[dateAndTime],
                                  userID: userData.user.id
                                },
                      refetchQueries: [{ query: PRODUCTS_QUERY}] 
                    }
                 )
                 setName('');

                 setPrice('');

                 setUrl('');
      
    }
}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! :(</p>;

  return (
    <div>

      <CategoryOptions callBackFromParent={setCategoryValue}/>

      <div>
      {/* <div>{`brandValue: ${brandValue !== null ? `'${brandValue}'` : 'null'}`}</div>
      <div>{`inputBrandValue: '${inputBrandValue}'`}</div> */}
      <div className={classes.textField}>
        <Autocomplete
          brandValue={brandValue}
          onChange={(event, newValue) => {
            setBrandValue(newValue);
          }}
          inputBrandValue={inputBrandValue}
          onInputChange={(event, newInputValue) => {
            setInputBrandValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={brandOptions}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Brand" variant="outlined" />}
        />
      </div>
    </div>


      <div>
        <TextField
        //PRODUCT NAME
          id="outlined-full-width"
          // style={{ margin: 8 }}
          placeholder="Product name"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={handleNameChange}
          value = {name}
        />

        <TextField
        //PRODUCT URL
          // style={{ margin: 8 }}
          placeholder="Product url"
          fullWidth
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange ={handleUrlChange}
          value = {url}
        />

        <TextField
          id="outlined-margin-none"
          placeholder="Price"
          margin="normal"
          className={classes.textField}
          variant="outlined"
          onChange ={handlePriceChange}
          value = {price}
        />

        <TextField
          id="outlined-margin-none"
          placeholder="Price floor"
          margin="normal"
          className={classes.textField}
          variant="outlined"
        />
        
        {/* <TextField
          id="outlined-margin-none"
          placeholder="Price ceiling"
          margin="normal"
          className={classes.textField}
          variant="outlined"
          error
          label="Error"
          helperText="Must be a number"
          variant="outlined"
        /> */}
        <div>
          <Button variant="contained" color="secondary" margin ="big" onClick={handleSubmit}>
            Submit 
          </Button>
        </div>

      </div>
    </div>
  );
}
