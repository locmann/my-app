import React from 'react';
import { addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';

function DialogsContainer() {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    function addMessage() {
                        store.dispatch(addMessageActionCreator());
                    }

                    function onMessageChange(text) {
                        store.dispatch(updateMessageActionCreator(text))
                    }
                    return <Dialogs updateMessageData={onMessageChange} addMessage={addMessage}
                        dialogs={state.msgPage.dialogs} messages={state.msgPage.messages}
                        newMsg={state.msgPage.newMsg} />

                }
            }
        </StoreContext.Consumer>

    );
}

export default DialogsContainer;