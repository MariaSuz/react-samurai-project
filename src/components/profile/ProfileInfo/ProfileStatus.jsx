import Preloader from '../../Common/Preloader/Preloader';
import React from 'react';

class ProfileStatus extends React.PureComponent {
    state = {
        editMode: false,
        statusLocal: this.props.status,
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    }
    deActivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateProfileStatus(this.state.statusLocal);
    }

    onStatusChange = (e) => {
        this.setState ({
            statusLocal: e.currentTarget.value
        })
    }

    componentDidUpdate (prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
        this.setState({status: this.props.status});
        }
    }


render() {
    return (
        <div>
            {!this.state.editMode &&
            <div>
                <span onDoubleClick= {this.activateEditMode}> {this.props.status || 'No status'} </span>
            </div>
            }
            {this.state.editMode &&
            <div>
                <input onChange= {this.onStatusChange} autoFocus = {true} onBlur = {this.deActivateEditMode} value={this.state.statusLocal}/>
            </div>
            }
      </div>
    )
  }
}
  export default ProfileStatus;