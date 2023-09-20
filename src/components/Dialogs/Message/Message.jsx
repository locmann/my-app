import styles from './Message.module.css';

function Message(props) {
    return (
        <div className={styles.message}>
            {props.data}
        </div>
    );
}

export default Message;