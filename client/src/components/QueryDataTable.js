import classes from './QueryDataTable.module.css';

function QueryDataTable(props) {

    
    return(
        <div className={classes.table_container}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Rarity</th>
                        <th>Condition</th>
                        <th>ISBN</th>
                        <th>Serial</th>
                    </tr>
                </thead>
                <tbody>
                    {props.queryValues.map((queryValue) => (
                        <tr key={queryValue.serial_number}>
                            <td>{queryValue.title}</td>
                            <td>{queryValue.author}</td>
                            <td>{queryValue.genre}</td>
                            <td>{queryValue.rarity}</td>
                            <td>{queryValue.condition}</td>
                            <td>{queryValue.isbn}</td>
                            <td>{queryValue.serial_number}</td>
                        </tr>
                    
                    ))}
                </tbody>
        </table>
        </div>
    );
}

export default QueryDataTable;