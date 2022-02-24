import UpdateBookForm from "../components/UpdateBookForm";
import Modal from "../components/Modal";

import { useState } from 'react';

function UpdateBook() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    function updateBookHandler(updateData) {
        fetch('http://localhost:5000/books/update', 
        {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setModalIsOpen(true);
    }

    return(
        <div>
            <UpdateBookForm onUpdateBook={updateBookHandler} />
            { modalIsOpen && <Modal text="Book condition updated" onConfirm={closeModalHandler}/> }
        </div>
        
    );
}

export default UpdateBook;