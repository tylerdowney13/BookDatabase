import classes from './Modal.module.css'

function Modal(props) {
    function confirmHandler() {
        props.onConfirm();
    }

    return(
        <div className={classes.modal}>
            <p>{props.text}</p>
            <button className={classes.btn} onClick={confirmHandler}>Confirm</button>
        </div>
    );
}

export default Modal;