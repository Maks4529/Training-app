import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect, useSelector, useDispatch} from 'react-redux';
import { updateUserThunk } from './../../store/slices/usersSlice';
import { CONSTANTS } from './../../constants/constants';
import Input from './../inputs'
import { VALIDATION_SCHEMAS } from './../../utils';
import styles from './UpdateProfileForm.module.sass';

function UpdateProfileForm({updateUser}) {
  const currentUser = useSelector(state => state.usersData.currentUser);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(() => {
      return () => {
        if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
      };
    }, [preview]);

    if(!currentUser) {
      return <div>Loading page...</div>
    }

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toISOString().split('T')[0];
        } catch (e) {
            return '';
        }
    };

    const initialValues = {
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        role: currentUser.role || CONSTANTS.ROLE.USER,
        birthday: formatDateForInput(currentUser.birthday),
        userPhoto: currentUser.image || null,
    }

    const classes = {
        input: styles.input,
        error: styles.error,
        valid: styles.valid,
        invalid: styles.invalid,
      };

      const handleSubmit = async(values, formikBag) => {
        console.log("--------TEST-------------");
        console.log('values :>> ', values);
        const formData = new FormData();

        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('role', values.role);
        formData.append('birthday', values.birthday);

        if(values.userPhoto && values.userPhoto instanceof File) {
          formData.append('userPhoto', values.userPhoto);
        }

        try {
          await dispatch(updateUserThunk({ id: currentUser.id, data: formData }));
            // await updateUser(formData);
            navigate('/profile');
            formikBag.resetForm();
        } catch (err) {
            formikBag.resetForm();
            alert('Update profile is failed. Please try again.');
        }
      };

  return (
    <Formik 
    initialValues={initialValues}
    validationSchema={VALIDATION_SCHEMAS.UPDATE_USER_VALIDATION_SCHEMA}
    onSubmit={handleSubmit}
    >
        {formikProps => (
            <Form className={styles.updateProfileForm}>
            <label className={styles.userPhoto}>
                <input className={styles.hiddenInput} type='file' name='userPhoto' onChange={e => {
                    const file = e.target.files[0];
                    if(file) {
                        formikProps.setFieldValue('userPhoto', file);
                        setPreview(URL.createObjectURL(file));
                    }
                }}
                 />
                 <img src={preview || currentUser.image} alt="Preview" />
            </label>
            <Input
            label='First name'
            type='text'
            name='firstName'
            placeholder='Your name...'
            classes={classes}
          />
          <Input
            label='Last name'
            type='text'
            name='lastName'
            placeholder='Your surname...'
            classes={classes}
          />
          <Input
            label='Date of birthday'
            type='date'
            name='birthday'
            classes={classes}
          />
          <label>
            Role:
          <Field
          as='select'
          name='role'
          className={styles.selectRole}
          >
            <option value={CONSTANTS.ROLE.USER}>{CONSTANTS.ROLE.USER}</option>
            <option value={CONSTANTS.ROLE.TRAINER}>{CONSTANTS.ROLE.TRAINER}</option>
          </Field>
          </label>
          <button type='submit' className={styles.submitBtn}>
            Save
          </button>
        </Form>
        )}
    </Formik>
  )
}

// const mapDispatchToProps = dispatch => ({
//     updateUser: data => dispatch(updateUserThunk(currentUser.id, data)),
// })

// export default connect(null, mapDispatchToProps) (UpdateProfileForm);

export default UpdateProfileForm;