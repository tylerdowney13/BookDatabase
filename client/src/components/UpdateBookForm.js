import classes from './UpdateBookForm.module.css';

import { useRef, useState } from 'react';

function UpdateBookForm(props) {
    const [selectCondition, setSelectCondition] = useState("Poor");

    const serialInputRef = useRef();

    function setSelectConditionValue(e) {
        const selectConditionValue = e.target.value;

        setSelectCondition(selectConditionValue);
    }

    function submitHandler(event) {
        event.preventDefault();

        const enteredCondition = selectCondition;
        const enteredSerial = serialInputRef.current.value;

        const updateData = {
            serial_number: enteredSerial,
            condition: enteredCondition
        }

        props.onUpdateBook(updateData);
    }

    return(
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
                <h1>Update Book Condition: </h1>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="updateInput">Serial Number: </label>
                    <input type="text" id="updateInput"  ref={serialInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="updateCondition">Condition: </label>
                    <select className={classes.control} onChange={setSelectConditionValue}>
                        <option disabled>Select Condition</option>
                        <option value="Poor">Poor</option>
                        <option value="Good">Good</option>
                        <option value="Mint">Mint</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button className={classes.actions}>Update Book Condition</button>
                </div>
            </form>
        </div>
    );   
}

export default UpdateBookForm;