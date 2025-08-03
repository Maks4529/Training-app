import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import Input from './../inputs';
import styles from './RegistrationForm.module.sass';
import { createUserThunk } from './../../store/slices/usersSlice';
import { VALIDATION_SCHEMAS } from './../../utils';

function RegistrationForm ({ createUser }) {
  const [preview, setPreview] = useState(null);

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

  const handleSubmit = (values, formikBag) => {
    const formData = new FormData();

    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('passwordHash', values.passwordHash);
    formData.append('birthday', values.birthday);
    formData.append('userPhoto', values.userPhoto);

    createUser(formData);

    formikBag.resetForm();
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
});

export default connect(null, mapDispatchToProps)(RegistrationForm);
