import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/reduxStore";

function mapStateToPropsForRedirect(state: AppStateType): MapPropsType {
  return {
    isAuth: state.auth.isAuth,
  };
}
type MapPropsType = {
  isAuth: boolean | null;
};
/* export function withAuthRedirect<CP extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<CP>
) {
  const RedirectComponent: React.FC<CP & MapPropsType> = (props) => {
    let { isAuth, ...restProps } = props;
    if (!isAuth) return <Navigate to="/login" />;
    return <Component {...(restProps as CP)} />;
  };

  let ConnectedAuthRedirectComponent = connect<
  MapPropsType,
  {},
  CP,
  AppStateType
>(mapStateToPropsForRedirect, {})(RedirectComponent);

  return ConnectedAuthRedirectComponent;
} */
export function withAuthRedirect(Component: React.ComponentType<MapPropsType>) {
  const RedirectComponent: React.FC<MapPropsType> = (props) => {
    if (!props.isAuth) return <Navigate to="/login" />;
    return <Component {...props} />;
  };

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
}
