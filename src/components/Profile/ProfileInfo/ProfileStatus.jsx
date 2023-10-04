import React from "react";

class ProfileStatus extends React.Component {
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

  onStatusChange = (e) => {
    this.setState({
      status: e.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
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
