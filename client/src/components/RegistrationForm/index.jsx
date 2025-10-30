import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import Input from './../inputs';
import styles from './RegistrationForm.module.sass';
import { createUserThunk, loginUserThunk } from './../../store/slices/usersSlice';
import { VALIDATION_SCHEMAS } from './../../utils';

function RegistrationForm ({ createUser, getUser }) {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    birthday: '',
    userPhoto: '',
  };

  const classes = {
    input: styles.input,
    error: styles.error,
    valid: styles.valid,
    invalid: styles.invalid,
  };

  const handleSubmit = async(values, formikBag) => {
    const formData = new FormData();

    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('passwordHash', values.passwordHash);
    formData.append('birthday', values.birthday);
    formData.append('userPhoto', values.userPhoto);
    try {
      await createUser(formData);
  
      await getUser({
        email: values.email,
        password: values.passwordHash,
      });

      navigate('/');
      formikBag.resetForm();
    } catch (err) {
      formikBag.resetForm();
      alert('Registration or login failed. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={VALIDATION_SCHEMAS.USER_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <Form className={styles.form}>
          <label className={styles.userPhoto}>
            <input
              className={styles.hiddenInput}
              type='file'
              name='userPhoto'
              onChange={e => {
                const file = e.target.files[0];
                if (file){
                  formikProps.setFieldValue('userPhoto', file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {preview ? (
              <img src={preview} alt="Preview" className={styles.previewImage} />
            ): ('+')}
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
            label='Email'
            type='email'
            name='email'
            placeholder='email@gmail.com'
            classes={classes}
          />
          <Input
            label='Password'
            type='password'
            name='passwordHash'
            placeholder='examplePassword240'
            classes={classes}
          />
          <Input
            label='Date of birthday'
            type='date'
            name='birthday'
            classes={classes}
          />
          <button type='submit' className={styles.submitBtn}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(createUserThunk(data)),
  getUser: data => dispatch(loginUserThunk(data)),
});

export default connect(null, mapDispatchToProps)(RegistrationForm);
