import React from 'react';
import { useEffect, useState } from 'react';

const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

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

    useEffect( () => {
        setStatus(props.status);
}, [props.status]);


    return (
        <div>
            {!editMode &&
            <div>
                <span onClick= {activateEditMode}> {props.status || 'No status'} </span>
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