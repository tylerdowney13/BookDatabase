import DeleteBookForm from "../components/DeleteBookForm";
import Modal from "../components/Modal";

import { useState } from 'react';

function DeleteBook() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    function DeleteBookHandler(deleteData) {
        fetch('http://localhost:5000/books/delete', 
        {
            method: 'DELETE',
            body: JSON.stringify(deleteData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setModalIsOpen(true);
    }
    return(
        <div>
            <DeleteBookForm onDelete={DeleteBookHandler} />
            { modalIsOpen && <Modal text="Book deleted" onConfirm={closeModalHandler}/> }
        </div>
    );
}

export default DeleteBook;