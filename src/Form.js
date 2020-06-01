import React, {useState} from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';


const PRODUCTS_QUERY = gql`
{
    products {
        id
        name
        price
    }
}`;

const CREATE_MUTATION = gql`
  mutation CreateProduct($name: String!, $category: String!, $brand: String!, $price: Int!, $url: String!){
  createProduct(name: $name, category: $category, brand: $brand, price: $price, url: $url) {
    id
    name
  }
}
`;

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const categoryOptions = ['Electronics', 'Clothing', 'Food', 'Lifestyle'];
const brandOptions = ['Amazon', 'Shopee', 'Lazada'];


export default function Form() {
  const classes = useStyles();
  const [createProduct] = useMutation(CREATE_MUTATION);
  const [brandValue, setBrandValue] = useState(brandOptions[0]);
  const [inputBrandValue, setInputBrandValue] = useState('');
  const [categoryValue, setCategoryValue] = useState(categoryOptions[0]);
  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState('');


  
//   function handleChange(e) {
//     const newText = e.target.value;
//     console.log(newText);
//     setText(newText);
// }

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

// function handleKeyDown(e) {

//     if (e.key === "Enter") {
//         e.preventDefault();
//         createTodo( 
//             {
//                 variables: {text: text},
//                 refetchQueries: [{ query: TodosQuery}] 
//             }
//          )
//          setText('');
//         }
//     }

  function handleSubmit() {
    if(brandValue !== null && categoryValue !== null && name !== '' && url !== '' && price > 0){
      createProduct( 
                    {
                        variables: {name: name, category: categoryValue, brand: brandValue, price: parseInt(price), url: url},
                        refetchQueries: [{ query: PRODUCTS_QUERY}] 
                    }
                 )
                 setName('');
                 setPrice(0);
                 setUrl('');
      
    }
}
  return (
    <div>

    <div className={classes.textField}>
        <Autocomplete
            categoryValue={categoryValue}
            onChange={(event, newValue) => {
            setCategoryValue(newValue);
            }}
            inputCategoryValue={inputCategoryValue}
            onInputChange={(event, newInputValue) => {
            setInputCategoryValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={categoryOptions}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
        />
      </div>
      
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
