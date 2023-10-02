import React from 'react';
import { addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

function mapStateToProps(state) {
    return {
        dialogs: state.msgPage,
        isAuth: state.auth.isAuth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateMessageData: (text) => {dispatch(updateMessageActionCreator(text))},
        addMessage: () => {dispatch(addMessageActionCreator())}
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);