import classes from './SearchForm.module.css';

import { useState, useRef } from 'react';

import QueryDataTable from './QueryDataTable';

function SearchForm() {
    const [selectType, setSelectType] = useState("ISBN");

    const [queryData, setQueryData] = useState(false);

    const formTextRef = useRef();

    function setSelectTypeValue(e) {
        const selectTypeValue = e.target.value;

        setSelectType(selectTypeValue);
    }


    function submitHandler(event) {
        event.preventDefault();

        const selectTypeVal = selectType;
        const formTextVal = formTextRef.current.value;

        // Search by ISBN
        if (selectTypeVal === "isbn") {
            fetch(`http://localhost:5000/books/isbn/${formTextVal}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            }).catch(err => {
                alert(err);
            }).then(data => {
                console.log(data);
                if (data[0]) {
                    const queryJSON = data;
                    console.log(queryJSON);
                    setQueryData(queryJSON);
                } else {
                    alert("No book with that ISBN")
                }
            })
        }

        // Search by author
        if (selectTypeVal === "author") {
            fetch(`http://localhost:5000/books/author/${formTextVal}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            }).catch(err => {
                alert(err);
            }).then(data => {
                console.log(data);
                if (data[0]) {
                    const queryJSON = data;
                    console.log(queryJSON);
                    setQueryData(queryJSON);
                } else {
                    alert("No book with that Author")
                }
            })
        }

        // Search by Genre
        if (selectTypeVal === "genre") {
            fetch(`http://localhost:5000/books/genre/${formTextVal}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            }).catch(err => {
                alert(err);
            }).then(data => {
                console.log(data);
                if (data[0]) {
                    const queryJSON = data;
                    console.log(queryJSON);
                    setQueryData(queryJSON);
                } else {
                    alert("No book with that Genre")
                }
            })
        }

        // Search by Genre
        if (selectTypeVal === "title") {
            fetch(`http://localhost:5000/books/title/${formTextVal}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            }).catch(err => {
                alert(err);
            }).then(data => {
                if (data[0]) {
                    const queryJSON = data;
                    setQueryData(queryJSON);
                } else {
                    alert("No book with that Title")
                }
            })
        }
    }
    

    return(
        <div>
            <div>
                <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="searchInput">Search Books: </label>
                    <input type="text" required id="searchInput" ref={formTextRef}/>
                </div>
                <div className={classes.control}>
                    <select className={classes.control} required onChange={setSelectTypeValue}>
                        <option>Select Type</option>
                        <option value="isbn">ISBN</option>
                        <option value="author">Author</option>
                        <option value="title">Title</option>
                        <option value="genre">Genre</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button className={classes.actions}>Search</button>
                </div>
                </form>
            </div>
            <div>
                {queryData ? <QueryDataTable queryValues={queryData}/> : <p>No Data</p>}
            </div>
        </div>
        
    );
    
}

export default SearchForm;