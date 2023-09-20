import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';

function Dialogs(props) {
    let newMessage = React.createRef();
    function addMessage() {
        
        let text = newMessage.current.value;
        props.addMessage();
    }

    function onMessageChange() {
        let text = newMessage.current.value;
        //call from props
        props.updateMessageData(text);
    }
    let newDialogsData = props.state.dialogs
        .map(mem => <DialogItem name={mem.name} id={mem.id} />)

    let newMessages = props.state.messages
        .map(msg => <Message data={msg.message} />)
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_item}>

                {newDialogsData}
            </div>

            <div className={styles.messages}>

                {newMessages}
            </div>
            <div>
                <textarea ref={newMessage} onChange={onMessageChange}
                value={props.state.newMsg}>

                </textarea>
                <button onClick={addMessage}>add msg</button>
            </div>
        </div>
    );
}

export default Dialogs;