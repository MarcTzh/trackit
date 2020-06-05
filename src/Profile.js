import React from 'react';
import Chart from './Chart';
import BrandOptions from './BrandOptions';
import CategoryOptions from './CategoryOptions';


function Profile() {
    return (
        <div> 
            <h1 align='center'>My Profile</h1>
            <CategoryOptions/>
            <BrandOptions/>
            <Chart />
        </div>
        
    );
}

export default Profile;