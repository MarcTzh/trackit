/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GeneralTextField from '../Input/GeneralTextField';
import TextField from '@material-ui/core/TextField';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GeneralButton from "../Input/GeneralButton";
import CategoryOptions from '../Input/CategoryOptions'
import UserContext from '../context/UserContext';
import { store } from 'react-notifications-component';
import Loading2 from '../Loaders/Loading2';
// import checkPrice from '../Parser/checkPrice';


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
  mutation CreateProduct($name: String!, $category: String!, $brand: String!, $price: Float, $url: String!, $minPrice: Float!, $priceArray: [Float]!, $dateArray: [String!]!, $userID: String!){
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
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

}));


// const brandOptions = ['Amazon', 'Lazada', 'Qoo10'];

export default function Form() {

  const { loading, error, data } = useQuery(CATEGORIES_QUERY);    
  const classes = useStyles();
  const [createProduct] = useMutation(CREATE_MUTATION);
  // const [brandValue, setBrandValue] = useState(brandOptions[0]);
  // const [inputBrandValue, setInputBrandValue] = useState('');
  // categoryValue is set to undefined. if user selects and unselects it, it will be set to null. 
  // therefore below categoryValue will check for both undefined and null value
  const [categoryValue, setCategoryValue] = useState();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0)
  const [minPriceError, setMinPriceError] = useState(false)
  const [url, setUrl] = useState('');

  const { userData } = useContext(UserContext);

  //TODO: FIX THIS JIYU THANKS
  //to determine whether to add a new category
  let catArray = [];
  let currUserID;
  // console.log(data);
  
  if(userData !== undefined && userData.user !== undefined && data !== undefined) {
    currUserID = String(userData.user.id);
    // for(let i = 0; i < data.categories.length; i++) {
    //   if(currUserID === data.categories[i].userID) {
    //     catArray.push(data.categories[i].name)
    //   }
    // }

    //alternative also doesnt work
    data.categories.filter((category) => 
      category.userID === currUserID)
    .map((category) => catArray.push(category.name));
      console.log(catArray)
    }
  //For dates
  const [today, setToday] = useState(new Date());  

  const CREATE_CATEGORY_MUTATION = gql`
    mutation createCategory($name: String!, $userID: String!){
    createCategory(name: $name, userID: $userID) {
      id
      name
      userID
    }
  }
  `;
  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION);

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

  function handleMinPriceChange(e) {
    const newMinPrice = e.target.value;
    if(newMinPrice !== null) {
      const tempMinPrice = parseFloat(newMinPrice);
      if(tempMinPrice) {
        setMinPriceError(false);
        setMinPrice(tempMinPrice);  
      } else {
        setMinPriceError(true);
      }
      
    }
  }

  function crawl() {
    if(url !== '') {
      console.log(`${url}`)
      store.addNotification({
        title: "Hold on",
        message: "Your product information is being retrieved",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true
        }
      });

      //i am stuck here, cannot do this
      // checkPrice(url);
    } else {
      store.addNotification({
        title: "Error:",
        message: "URL cannot be empty",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
    }
}

function handleSubmit() {
    console.log(categoryValue)
    const currDate = (new Date().getTime()).toString(10);
    if(categoryValue !== null && categoryValue !== undefined && name !== '' && url !== '' && minPrice > 0){
      //freesolo function in autocomplete function
      //if user input is a new cat, create new cat
      if(catArray !== [] && !catArray.includes(categoryValue)){
        console.log(catArray);
        createCategory( 
                      {
                          variables: {name: categoryValue, userID: userData.user.id},
                          refetchQueries: [{ query: CATEGORIES_QUERY}] 
                      }
                   )
      }
      createProduct( 
                    {
                      variables: {name: name, 
                                  category: categoryValue, 
                                  brand: '', 
                                  price: 0, 
                                  url: url, 
                                  minPrice: minPrice,
                                  priceArray:[], 
                                  dateArray:[currDate],
                                  userID: userData.user.id
                                },
                      refetchQueries: [{ query: PRODUCTS_QUERY}] 
                    }
                 )
                 setName('');

                 setPrice('');

                 setUrl('');

                 setMinPrice(0);

                store.addNotification({
                  title: "Success:",
                  message: "Your product is being processed! Please wait a moment for it to appear on your Products Page",
                  type: "success",
                  insert: "top",
                  container: "top-right",
                  animationIn: ["animated", "fadeIn"],
                  animationOut: ["animated", "fadeOut"],
                  dismiss: {
                    duration: 2000,
                    onScreen: true
                  }
                });
    } else {
      store.addNotification({
        title: "Error:",
        message: "Not all required fields are entered correctly",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
        });
    }
}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! :(</p>;

  return (
    <div>
        {/* <Loading2 /> */}
        <div>
          <CategoryOptions callBackFromParent={setCategoryValue}/>
        </div>
        {/* <div>{`brandValue: ${brandValue !== null ? `'${brandValue}'` : 'null'}`}</div>
        <div>{`inputBrandValue: '${inputBrandValue}'`}</div> */}
        <div style={{paddingTop:15}}>
          {/* <Autocomplete
            brandValue={brandValue}
            onChange={(event, newValue) => {
              setBrandValue(newValue);
            }}
            inputBrandValue={inputBrandValue}
            onInputChange={(event, newInputValue) => {
              setInputBrandValue(newInputValue);
            }}
            id="controllable-states-demo"
            className={classes.textField}
            options={brandOptions}
            fullWidth={true}
            renderInput={(params) => <TextField {...params} label="Platform" variant="outlined" />}
          /> */}
          
        </div>

        <div>

        <GeneralTextField
            onChange ={handleUrlChange}
            value = {url}
            placeholder ="Product url"
          />
        {/* autocomplete button */}
        {/* <div style={{paddingTop: 10, paddingBottom: 50}}>
          <GeneralButton onClick={crawl}
            fullWidth={true} className={classes.textField} text="Autocomplete" />
        </div> */}
          <GeneralTextField
            placeholder="Product name"
            onChange ={handleNameChange}
            value = {name}
          />
          
          {/* 
          <TextField
            id="outlined-margin-none"
            placeholder="Price"
            margin="normal"
            className={classes.textField}
            variant="outlined"
            onChange ={handlePriceChange}
            value = {price}
          /> */}
          <GeneralTextField
            placeholder="Price to be notified at"
            onChange={handleMinPriceChange}
            error = {minPriceError}
          />

          <div style={{paddingTop: 15}}>
            <GeneralButton 
              onClick={handleSubmit}
              fullWidth={true}
              text="Submit"
            />

          </div>

      </div>
    </div>
  );
}
