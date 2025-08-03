import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import Input from './../inputs';
import styles from './LoginForm.module.sass';
import { loginUserThunk } from './../../store/slices/usersSlice';
import { VALIDATION_SCHEMAS } from './../../utils';

function LoginForm ({ getUser }) {
  const initialValues = {
    email: '',
    password: '',
  };

  const classes = {
    input: styles.input,
    error: styles.error,
    valid: styles.valid,
    invalid: styles.invalid,
  };

  const handleSubmit = (values, formikBag) => {
    getUser({
      email: values.email,
      password: values.password,
    });

    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={VALIDATION_SCHEMAS.LOGIN_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {formikProps => (
        <Form className={styles.form}>
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
            name='password'
            placeholder='examplePassword240'
            classes={classes}
          />
          <button type='submit' className={styles.submitBtn}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = dispatch => ({
  getUser: data => dispatch(loginUserThunk(data)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
