import Preloader from '../../Common/Preloader/Preloader';
import { useEffect, useState } from 'react';

const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    // state = {
    //     editMode: false,
    //     statusLocal: this.props.status,
    // }

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateProfileStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus (e.currentTarget.value)
    }

    // componentDidUpdate (prevProps, prevState) {
    //     if(prevProps.status !== this.props.status) {
    //     this.setState({status: this.props.status});
    //     }
    // }

    useEffect( () => {
        setStatus(props.status);
}, [props.status]);


    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick= {activateEditMode}> {props.status || 'No status'} </span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange= {onStatusChange} autoFocus={true} onBlur = {deActivateEditMode} value={status}/>
            </div>
            }
      </div>
    )

}
  export default ProfileStatus;