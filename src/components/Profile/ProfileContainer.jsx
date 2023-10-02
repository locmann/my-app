import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profileReducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { profileThunk } from '../../redux/profileReducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let profileId = this.props.router.params.userId;
        if (!profileId) {
            profileId = 2
        }
        this.props.profileThunk(profileId)
    }
    
    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props} router={{location, navigate, params}} />
        )
    }

    return ComponentWithRouterProp;
}


function mapStateToProps(state) {
    return {
        profile: state.profilePosts.profile,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {setUserProfile, profileThunk}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);