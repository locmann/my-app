import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  profileThunk,
  getStatus,
  updateStatus,
  savePhoto,
} from "../../redux/profileReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let profileId = this.props.router.params.userId;
    if (!profileId) {
      profileId = this.props.userId;
    }
    this.props.profileThunk(profileId);
    this.props.getStatus(profileId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.router.params.userId != this.props.router.params.userId)
      this.refreshProfile();
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        isOwner={!this.props.router.params.userId}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function mapStateToProps(state) {
  return {
    profile: state.profilePosts.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePosts.status,
    userId: state.auth.id,
  };
}

export default compose(
  connect(mapStateToProps, {
    getStatus,
    profileThunk,
    updateStatus,
    savePhoto,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
