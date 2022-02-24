import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
    return(
        <header className={classes.header}>
            <div className={classes.logo}>Books App</div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Books</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                    <li>
                        <Link to="/update">Update</Link>
                    </li>
                    <li>
                        <Link to="/delete">Delete</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;