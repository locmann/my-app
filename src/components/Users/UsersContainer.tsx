import React from "react";
import { useSelector } from "react-redux";
import { Users } from "./Users";
import Preloader from "../common/Preloader";
import { getIsFetching } from "../../redux/userSelectors";

export const UserPage: React.FC = (props) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
