import React from 'react';
import Form from './Form';
import AddNewCategory from './AddNewCategory';

function AddNew() {
    return (
        <div>
            <h1>Add a new product to track!</h1>
            <p>Need a new Category?</p>
            <AddNewCategory/>
            <p>Add your new product below</p>
            <Form />
        </div>
    );
}

export default AddNew;