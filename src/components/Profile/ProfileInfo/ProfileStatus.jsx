import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
  };

  activateStatus() {
    this.setState({
        editMode: true
    })
  }

  deactivateStatus() {
    this.setState({
        editMode: false
    })
  }

  render() {
    return (
      <div>
        {!this.state.editMode && <span onDoubleClick={this.activateStatus.bind(this)}>{this.props.status}</span>}
        {this.state.editMode && <input autoFocus={true} onBlur={this.deactivateStatus.bind(this)} type="text" value={this.props.status} />}
      </div>
    );
  }
}

export default ProfileStatus;
