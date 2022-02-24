import classes from './DeleteBookForm.module.css';

import { useRef } from 'react';

function DeleteBookForm(props) {
    const serialInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const deleteData = {
            serial_number: serialInputRef.current.value
        }

        props.onDelete(deleteData);
    }

    return(
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
                <h1>Delete Book: </h1>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="deleteInput">Serial Number: </label>
                    <input type="text" id="deleteInput" ref={serialInputRef} required/>
                </div>
                <div className={classes.actions}>
                    <button className={classes.actions}>Delete Book</button>
                </div>
            </form>
        </div>
    );
}

export default DeleteBookForm;