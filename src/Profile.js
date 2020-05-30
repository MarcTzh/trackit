import React from 'react';
import Chart from './Chart';
import BrandOptions from './BrandOptions';
import CategoryOptions from './CategoryOptions';

function Profile() {
    return (
        <div> 
            <h1 align='center'>My profile</h1>
            <CategoryOptions align='center'/>
            <BrandOptions/>
            <Chart />
        </div>
        
    );
}

export default Profile;