import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  RouteProps,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  profileThunk,
  getStatus,
  updateStatus,
  savePhoto,
  updateUserProfile,
} from "../../redux/profileReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { ProfileType } from "../types/types";
import { AppStateType } from "../../redux/reduxStore";

type MapPropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  getStatus: (userId: number) => void;
  profileThunk: (profileId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  updateUserProfile: (profile: ProfileType) => void;
  params: any; //!!!
};

type PropsType = MapPropsType & MapDispatchPropsType & RouteProps;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let profileId = this.props.params.userId;
    if (!profileId) {
      profileId = this.props.userId;
    }
    this.props.profileThunk(profileId);
    this.props.getStatus(profileId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.params.userId != this.props.params.userId)
      this.refreshProfile();
  }

  render() {
    //debugger;
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        isOwner={!this.props.params.userId}
        savePhoto={this.props.savePhoto}
        updateUserProfile={this.props.updateUserProfile}
      />
    );
  }
}

export interface WithRouterProps {
  params: Record<string, string>;
}

const withRouter = <Props extends WithRouterProps>(
  Component: React.ComponentType<Props>
) => {
  function ComponentWithRouterProp(props: Omit<Props, keyof WithRouterProps>) {
    let params = useParams();
    return <Component {...(props as Props)} params={params} />;
  }

  return ComponentWithRouterProp;
};

function mapStateToProps(state: AppStateType) {
  return {
    profile: state.profilePosts.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePosts.status,
    userId: state.auth.id,
  };
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getStatus,
    profileThunk,
    updateStatus,
    savePhoto,
    updateUserProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
