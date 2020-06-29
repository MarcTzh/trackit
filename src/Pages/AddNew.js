import React from 'react';
import Form from '../Input/Form';
import AddNewCategory from '../Input/AddNewCategory';

function AddNew() {
    return (
        <div>
            <div style={{ margin: 15 , padding: 15}}>
                <h1>Add a new product to track!</h1>
                <h2>Add new category</h2>
                <AddNewCategory/>
                <h2>Add your new product below</h2>
                <Form />
            </div>
        </div>
    );
}

export default AddNew;