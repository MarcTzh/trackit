import React, {Component} from 'react';
//updated import
import Chart from './Chart/LineChart';
import BrandOptions from './BrandOptions';
import CategoryOptions from './CategoryOptions';
//graphql stuff
// import { gql } from 'apollo-boost';
// import { useQuery, useMutation } from '@apollo/react-hooks';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import IconButton from '@material-ui/core/IconButton';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import Paper from '@material-ui/core/Paper';
// import ClearIcon from '@material-ui/icons/Clear';


// function Profile() {
//     return (
//         <div> 
//             <h1 align='center'>My Profile</h1>
//             <CategoryOptions/>
//             <Chart />
//         </div>
        
//     );
// }

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //initialised to null
            chartData: {}
        }
    }
    
    componentWillMount() {
        this.getChartData();
    }

    getChartData() {
        //call info from AmazonParser.js to get latest price
        //combine with price chart data from database and setState here
        this.setState({
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Amazon',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: [200, 210, 215, 212, 220, 230, 225]
                }, {
                    label: 'Shopee',
                    backgroundColor: 'rgb(255, 165, 0)',
                    borderColor: 'rgb(255, 165, 0)',
                    fill: false,
                    data: [200, 200, 215, 202, 210, 220, 215]
                }
            ]
            }
        });
    }
    
    
    render() {
        return (
            <div> 
                <h1 align='center'>My Profile</h1>
                <CategoryOptions/>
                <Chart chartData={this.state.chartData} />
                
                
            </div>
        );
    }
}


export default Profile;