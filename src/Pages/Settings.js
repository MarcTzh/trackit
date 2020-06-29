import React from 'react';
import DiscreteSlider from '../Input/Slider';
import ChangeAccountDetails from '../Input/ChangeAccountDetails'



function Settings(props) {
    function editNotificationPreference (value) {
        //add this to userModel
    }
    return (
        <div style={{ margin: 15 , padding: 15}}>
            <div style={{ marginTop: -30}}>
                    <h1>User settings</h1>
                    <h2>Edit notification settings</h2>
                    <DiscreteSlider editSliderValue={editNotificationPreference}/>
            </div>
            <div style={{ marginTop: 30}}>
                <h2>Edit account details</h2>
                <ChangeAccountDetails />
            </div>

        </div>
    );
}

export default Settings;