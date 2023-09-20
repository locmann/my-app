import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';
import {addMessageActionCreator, updateMessageActionCreator} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

function DialogsContainer(props) {
    let state = props.store.getState();
    function addMessage() {
        props.store.dispatch(addMessageActionCreator());
    }

    function onMessageChange(text) {
        props.store.dispatch(updateMessageActionCreator(text))
    }
    return (
        <Dialogs updateMessageData={onMessageChange} addMessage={addMessage} 
        dialogs={state.msgPage.dialogs} messages={state.msgPage.messages} newMsg={state.msgPage.newMsg} />
    );
}

export default DialogsContainer;