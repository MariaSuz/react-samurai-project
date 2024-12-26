import { Field, reduxForm } from 'redux-form';
import ProfileInfoCSS from'./ProfileInfo.module.css';
import { Input, Textarea } from '../../Common/FormsControls/FormsControls.tsx';



function ProfileEditForm(props) {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <span>Full Name: </span>
                <Field placeholder={'Full name'} name={'fullName'} component={Input} />
            </div>
            <div>
                <span>Looking for a job: </span>
                <Field type={'checkbox'} name={'lookingForAJob'} component={Input} />
            </div>
            <div>
                <span>About skills:</span>
                <Field placeholder={'Write your skills'}  name={'lookingForAJobDescription'} component={Textarea} />
            </div>
            <div>
                <span>About skills:</span>
                <Field placeholder={'About you'}  name={'aboutMe'} component={Textarea} />
            </div>
            <div>
                <span>About me:</span>
                {Object.keys(props.profile.contacts).map(key => {
                        return <div key={key}>
                            {key} : {<Field name={'contacts.' + key} component={Input} />}
                            </div>
                    })}
            </div>
              <button onClick = {props.onSubmit} className={ProfileInfoCSS.button_contacts}>Save profile</button>
        </form>
    )
  }


  const ProfileReduxForm = reduxForm({form: 'profile', destroyOnUnmount: false})(ProfileEditForm);

//   const ProfileEdit = (props) => {
//     const onSubmit = (formData) => {
//         props.saveProfile(formData.fullName, formData.lookingForAJob, formData.lookingForAJobDescription);
//     }

//     return <div>
//         <ProfileReduxForm onSubmit={onSubmit} {...props}/>
//     </div>

// }

  export default ProfileReduxForm;