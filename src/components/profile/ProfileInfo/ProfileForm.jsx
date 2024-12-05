
import ProfileInfoCSS from'./ProfileInfo.module.css';

function ProfileForm(props) {

    return (
        <div>
            <form>
            <div className={ProfileInfoCSS.descriptionblock}>
                <span>contacts:</span>
             </div>
            <div className={ProfileInfoCSS.descriptionblock}>
                <ul>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <Contact key={key} title={key} value={props.profile.contacts[key]}/>
                    })}
                </ul>
            </div>
            </form>
            {props.isOwner &&
                <button onClick = {props.goToEditMode} className={ProfileInfoCSS.button_contacts}>Refresh profile</button>}
        </div>
    )
  }

  const Contact =  ({title, value}) => {
    return <li>{title}: {value}</li>
  }

  export default ProfileForm;