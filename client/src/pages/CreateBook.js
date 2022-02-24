import NewBookForm from "../components/NewBookForm";
import Modal from "../components/Modal";

import { useState } from 'react';

function CreateBook() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    function createBookHandler(bookData) {
        fetch(
            'http://localhost:5000/books/newbook',
            {
                method: 'POST',
                body: JSON.stringify(bookData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        setModalIsOpen(true);
    }


    return(
        <div>
            <NewBookForm onCreateBook={createBookHandler}/>
            { modalIsOpen && <Modal text="New Book Created" onConfirm={closeModalHandler}/> }
        </div>
        
    );
}

export default CreateBook;