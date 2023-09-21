import React from 'react';
import { addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        dialogs: state.msgPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateMessageData: (text) => {dispatch(updateMessageActionCreator(text))},
        addMessage: () => {dispatch(addMessageActionCreator())}
    }
}


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;