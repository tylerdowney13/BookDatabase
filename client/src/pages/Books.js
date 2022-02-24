import QueryDataTable from "../components/QueryDataTable";

import classes from './Books.module.css'

import { useState } from 'react';

function BooksPage() {
    const [queryData, setQueryData] = useState(false);

    function getBooks() {
        fetch(`http://localhost:5000/books`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json();
        }).catch(err => {
            alert(err);
        }).then(data => {
            setQueryData(data);
        })
    }
    

    return(
        <div>
            <button className={classes.btn} onClick={getBooks}>Get All Books</button>
            {queryData ? <QueryDataTable queryValues={queryData}/> : <p>No Data</p>}
        </div>
    );
}

export default BooksPage;