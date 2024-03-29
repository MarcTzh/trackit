// import React, {Component} from 'react';
import React, {useState, useContext, useEffect} from 'react';
//updated import
import LineChart from '../Chart/LineChart';
// import BrandOptions from '../Input/BrandOptions';
import CategoryOptions from '../Input/CategoryOptions';
//graphql stuff
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import UserContext from '../context/UserContext';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import ChartToggle from '../Input/ChartToggle.js';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Loading from '../Loaders/Loading';
import styles from '../style.css'




const PRODUCTS_QUERY = gql `
{
    products {
        id
        name
        price
        category
        userID
        priceArray
        dateArray
    }
}`;



function Profile() {

    const [categoryValue, setCategoryValue] = useState();

    const { loading, error, data } = useQuery(PRODUCTS_QUERY);

    const { userData } = useContext(UserContext);
    
    const [chartData, setChartData] = useState({});

    const [period, setPeriod] = useState('all');

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(1),
          textAlign: 'center',
          // color: theme.palette.text.secondary,
          background: "#212029",
        },
        title: {
            fontSize:44,
            color: "white",
            fontWeight:700,
          },
          subtitle: {
            fontSize:28,
            color: "white",
            fontWeight:500,
          },
          card: {
            // padding: theme.spacing(1),
            marginLeft: theme.spacing(2),
            // marginRight: theme.spacing(1),
            marginTop: theme.spacing(1),
            textAlign: 'center',
            // color: theme.palette.text.secondary,
            backgroundColor: "#212029",
            // opacity: 0.95,
            border: "1px solid gray"
          },
      }));

      const classes = useStyles();
    
    function resetDate(dateInMs) {
        var date = new Date(parseInt(dateInMs));
        var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return newDate.getTime();
    }

    function dateToMS(dateArray) {
        var tempDateArray =[];
        for (var i = 0; i < dateArray.length; i++) {
            tempDateArray.push(dateArray[i].getTime());
        }
        return tempDateArray;
    }

    function MStoDate(dateArray) {
        var tempDateArray = [];
        for (var i = 0; i < dateArray.length; i++) {
            tempDateArray.push(new Date(parseInt(dateArray[i])));
        }
        return tempDateArray;
    }

    //modify array according to period selected
    function periodModifier(period, array) {
        if(period === 'week' && array.length > 7) {
            return array.splice(-7);
        } else if(period === 'month' && array.length > 31) {
            return array.splice(-31);
        } else {
            return array;
        }
    }
    
    //takes in dateArray and priceArray
    //returns 2 arrays in a pair.
    //if there are 2 or more prices on the same day, it will keep the lower entry and remove the others
    function singleDayProccessor(dateArray, priceArray){
        const newDateArray = [];
        const newPriceArray = [];
        const tempDateArray = MStoDate(dateArray);
        // dateArray.map(ms => new Date(parseInt(ms)));
        

        if(tempDateArray.length === 1) {
            newPriceArray.push(priceArray[0]);
            newDateArray.push(tempDateArray[0])
        } else {
            for(var i = 0; i < tempDateArray.length; i++) {

                //if got two prices recorded for the same day
                if(i !== tempDateArray.length - 1 &&
                    tempDateArray[i].getDate() === tempDateArray[i+1].getDate() &&
                    tempDateArray[i].getMonth() === tempDateArray[i+1].getMonth() &&
                    tempDateArray[i].getFullYear() === tempDateArray[i+1].getFullYear()) {

                    //if the price for the current entry is lower
                    if(priceArray[i] < priceArray[i + 1]) {
                        newPriceArray.push(priceArray[i]);
                        newDateArray.push(tempDateArray[i])
                        i++;
                    // if the price for the next entry is lower, record that one
                    } else {
                        newDateArray.push(tempDateArray[i + 1])
                        newPriceArray.push(priceArray[i + 1]);
                        i++;
                    }


                // if no two prices on the same day, just record the entry    
                } else {
                    newPriceArray.push(priceArray[i]);
                    newDateArray.push(tempDateArray[i])
                }
            }
        }

        // newDateArray.map(date => date.getTime().toString())
        
        return [dateToMS(newDateArray), newPriceArray];
    }

    //create array for dates from start date to end date
    function consecutiveDateArray(start, end){

        var dateArray =[resetDate(start)];
        end = resetDate(end);
        while(dateArray[dateArray.length - 1] < parseInt(end)) {
            dateArray.push(parseInt(dateArray[dateArray.length - 1]) + 86400000)
        }
        return dateArray;
    }

    //extends completeDateArray
    function extendDateArray(dateArray, completeDateArray) {
        var start;
        var end;
        if(completeDateArray.length === 0 && dateArray.length === 0) {

            return [];
        } else if (dateArray.length === 0) {

            return completeDateArray;
        }else if(completeDateArray.length === 0) {

            start = dateArray[0];
            end = dateArray[dateArray.length - 1];
        } else {
            // console.log("bump4");
            // console.log(dateArray)
            // console.log("firstdate " + parseInt(dateArray[0]));
            // console.log("lastdate " + parseInt(dateArray[dateArray.length - 1]));
            // console.log(completeDateArray);
            // console.log("complete first date " + parseInt(completeDateArray[0]));
            // console.log("complete last date " + parseInt(completeDateArray[completeDateArray.length - 1]));

            if(parseInt(dateArray[0]) <= parseInt(completeDateArray[0])) {
                start = dateArray[0];
            } else {
                start = completeDateArray[0];
            }

            if(parseInt(dateArray[dateArray.length - 1]) <= parseInt(completeDateArray[completeDateArray.length - 1])) {
                end = completeDateArray[completeDateArray.length - 1];
                
            } else {
                end = dateArray[dateArray.length - 1];
            }
            console.log("start " + start);
            console.log("end" + end);
        }
        return consecutiveDateArray(start, end);
    }

    //fill in the gaps with null
    function addTheNull(priceArray, dateArray, completeDateArray) {
        var newPriceArray = [];
        var j = 0;
        dateArray = MStoDate(dateArray);
        completeDateArray = MStoDate(completeDateArray);
        for(var i = 0; i < completeDateArray.length; i++) {

            if(j < dateArray.length && 
            dateArray[j].getDate() === completeDateArray[i].getDate() &&
            dateArray[j].getMonth() === completeDateArray[i].getMonth() &&
            dateArray[j].getFullYear() === completeDateArray[i].getFullYear()){
                newPriceArray.push(priceArray[j]);
                j++;
            } else {
                newPriceArray.push(null);
            }
        }

        return newPriceArray;
    }

    const handleClick = (product, user, period) => {
        console.log(userData.user.id)
        var dataset = [];
        var finalPriceArrays = [];
        const val = ['#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333'
        , '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
         '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E'];

        //filter out products and stores them as objects in a new array
        var filteredProducts = [];
        for (var i = 0; i < product.length; i++) {
            if(product[i].userID === user.id && product[i].category === categoryValue) {
                filteredProducts.push(product[i]);
            }
        }

        //in each loop, extends the date array based on the current date array given
        var completeDateArray =[];
        for(var n = 0; n < filteredProducts.length; n++) {
            const pair = singleDayProccessor(filteredProducts[n].dateArray, filteredProducts[n].priceArray);
            filteredProducts[n].dateArray = pair[0];
            filteredProducts[n].priceArray = pair[1];

            completeDateArray = extendDateArray(filteredProducts[n].dateArray, completeDateArray);

        }
        console.log("last date" + completeDateArray.length);

        //fill the gaps of the price array in accordance to the longer completeDateArray
        for(var k = 0; k < filteredProducts.length; k++) {
            finalPriceArrays.push( 
                addTheNull(
                    filteredProducts[k].priceArray, 
                    filteredProducts[k].dateArray, 
                    completeDateArray
                )
            )
        }


        for(var m = 0; m < filteredProducts.length; m++) {
            dataset.push({
                    label: filteredProducts[m].name,
                    data: periodModifier(period, finalPriceArrays[m]),
                    fill: false,
                    borderColor: val[m],
                    backgroundColor: val[m],
            });
        }

        var newCompleteDateArray = [];
        for (var i = 0; i < completeDateArray.length; i++) {
            const d = new Date(completeDateArray[i]);
            newCompleteDateArray.push((d.getDate()) + " " + (d.getMonth() + 1) + " " + d.getFullYear());
        }

        console.log(period);

        return(setChartData({
            labels: periodModifier(period, newCompleteDateArray),
            datasets: dataset
        }))
        
    }

    useEffect(() => {
        if(userData !== undefined && userData.user !== undefined && data !== undefined) {
            handleClick(data.products, userData.user, period)
        }
    }, [data, userData, categoryValue, period])

        
    if (loading) return <Loading open={true}/>;
    if (error) return <p>Error! :(</p>;

        

    return (
        <>
        {userData.user ? (
            <div className={classes.paper} style={{ margin: 30 , padding: 30}}>
                <div style={{ marginBottom: 30}}> 
                    <div className={classes.title}>Charts</div>
                    <div className={classes.subtitle}>Please Choose a Category to Display</div>
                </div>
                <div>
                    <CategoryOptions callBackFromParent={setCategoryValue} />
                    <ChartToggle callBackFromParent={setPeriod}/>
                    <div className={classes.card} style={{padding:30}}>
                        <LineChart chartData={chartData} catValue = {categoryValue}/>
                    </div>
                    <p>Click on individual products to remove them from view</p>
                </div>
            </div>
        ) : (
            <>
            <h2 >You are not logged in</h2>
            <Link to="/login">Log in</Link>
            </>
        )
        }
        </>
    );
    
}


export default Profile;