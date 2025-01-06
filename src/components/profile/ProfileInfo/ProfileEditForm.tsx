import { Field, reduxForm } from 'redux-form';
import ProfileInfoCSS from'./ProfileInfo.module.css';
import { Input, Textarea } from '../../Common/FormsControls/FormsControls.tsx';
import React from 'react';



function ProfileEditForm(props) {
    const { handleSubmit, profile } = props;
    return (
        <form onSubmit={handleSubmit}>
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
                <span>About me:</span>
                <Field placeholder={'About you'}  name={'aboutMe'} component={Textarea} />
            </div>
            <div>
                <span>Contacts:</span>
                {Object.keys(profile.contacts).map(key => {
                        return(
                        <div key={key}>
                            {key} : {<Field name={`contacts.${key}`} component={Input} />}
                        </div>
                        );
                    })}
            </div>
              <button type="submit" className={ProfileInfoCSS.button_contacts}>Save profile</button>
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