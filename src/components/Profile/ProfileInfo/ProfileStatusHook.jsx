import React, { useState } from "react";

const ProfileStatusHook = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateStatus = () => {
    setEditMode(true);
  };

  const deactivateStatus = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };

  /* componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  } */

  return (
    <div>
      {!editMode && (
        <span onDoubleClick={activateStatus}>{status || "========="}</span>
      )}
      {editMode && (
        <input
          onChange={onStatusChange}
          autoFocus={true}
          onBlur={deactivateStatus}
          type="text"
          defaultValue={status}
        />
      )}
    </div>
  );
};

export default ProfileStatusHook;
