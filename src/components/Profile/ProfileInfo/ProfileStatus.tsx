import React, { ChangeEvent } from "react";

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

type StateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateStatus = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateStatus = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.target.value,
    });
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <span onDoubleClick={this.activateStatus}>
            {this.props.status || "========="}
          </span>
        )}
        {this.state.editMode && (
          <input
            onChange={this.onStatusChange}
            autoFocus={true}
            onBlur={this.deactivateStatus}
            type="text"
            defaultValue={this.state.status}
          />
        )}
      </div>
    );
  }
}

export default ProfileStatus;
