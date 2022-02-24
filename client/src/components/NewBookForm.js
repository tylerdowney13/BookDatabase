import classes from './NewBookForm.module.css';

import { useRef, useState } from 'react';

function NewBookForm(props) {
    const titleInputRef = useRef();
    const authorInputRef = useRef();
    const genreInputRef = useRef();
    const isbnInputRef = useRef();
    const serialInputRef = useRef();

    const [selectCondition, setSelectCondition] = useState("Poor");

    function setSelectConditionValue(e) {
        const selectConditionValue = e.target.value;

        setSelectCondition(selectConditionValue);
    }

    function submitHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredAuthor = authorInputRef.current.value;
        const enteredGenre = genreInputRef.current.value;
        const enteredIsbn = isbnInputRef.current.value;
        const enteredSerial = serialInputRef.current.value;
        const enteredCondition = selectCondition;

        const bookData = {
            title: enteredTitle,
            author: enteredAuthor,
            genre: enteredGenre,
            isbn: enteredIsbn,
            serial_number: enteredSerial,
            condition: enteredCondition
        }

        props.onCreateBook(bookData);
    }


    return(
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
                <h1>Create New Book:</h1>
                <div className={classes.control}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" ref={titleInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="author">Author: </label>
                    <input type="text" id="author" ref={authorInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="genre">Genre: </label>
                    <input type="text" id="genre" ref={genreInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="isbn">ISBN: </label>
                    <input type="text" id="isbn" ref={isbnInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="serial_number">Serial Number: </label>
                    <input type="text" id="serial_number" ref={serialInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="select_condition">Condition: </label>
                    <select name="select_condition" onChange={setSelectConditionValue}>
                        <option disabled>Select Condition</option>
                        <option value="Poor">Poor</option>
                        <option value="Good">Good</option>
                        <option value="Mint">Mint</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button>Create Book</button>
                </div>
            </form>
        </div>
    );
}

export default NewBookForm;