import React from 'react';
import Header from './Header';
import axios from "axios";
import { connect } from 'react-redux';
import { setAuthUserData, setFetchingPreloader } from '../../redux/authReducer';
import { usersAPI } from '../../api/api';
class HeaderContainer extends React.Component {
    componentDidMount() {
        //this.props.setFetchingPreloader(true)
        usersAPI.getAuth().then(
                data => {
                    if (data.resultCode === 0) {
                        let {id, login, email} = data.data
                        this.props.setAuthUserData(id, login, email)
                    }
                }
            )
    }
    render() {
        return (
            <Header {...this.props} />
        );
    }

}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);