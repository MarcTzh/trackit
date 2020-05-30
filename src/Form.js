import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BrandOptions from './BrandOptions';
import CategoryOptions from './CategoryOptions';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  }
}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));


const brandOptions = ['Amazon', 'e-commerce 2', 'e-commerce 3'];


export default function Form() {
  const classes = useStyles();
  const [brandValue, setBrandValue] = useState(brandOptions[0]);
  const [inputBrandValue, setInputBrandValue] = useState('');

  return (
    <div>
      
      <div>
      {/* <div>{`brandValue: ${brandValue !== null ? `'${brandValue}'` : 'null'}`}</div>
      <div>{`inputBrandValue: '${inputBrandValue}'`}</div> */}
      <br />
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
        />

        <TextField
          id="outlined-margin-none"
          placeholder="Price"
          margin="normal"
          className={classes.textField}
          variant="outlined"
        />

        <TextField
          id="outlined-margin-none"
          placeholder="Price floor"
          margin="normal"
          className={classes.textField}
          variant="outlined"
        />
        
        <TextField
          id="outlined-margin-none"
          placeholder="Price ceiling"
          margin="normal"
          className={classes.textField}
          variant="outlined"
          error
          label="Error"
          helperText="Must be a number"
          variant="outlined"
        />
        

      </div>
    </div>
  );
}
