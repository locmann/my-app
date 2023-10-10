import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function mapStateToPropsForRedirect(state) {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect(Component) {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to="/login" />
            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}