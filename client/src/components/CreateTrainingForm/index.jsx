import {Formik, Form} from 'formik';
import {connect} from 'react-redux';
import Input from './../inputs';
import styles from './CreateTrainingForm.module.sass';
import { createTrainingThunk } from './../../store/slices/trainingsSlice';

function CreateTrainingForm({createTraining}) {
  const initialValues = {
    title: '',
    description: '',
  };

  const classes = {
      input: styles.input,
      error: styles.error,
      valid: styles.valid,
      invalid: styles.invalid,
    };

    const handleSubmit = (values, formikBag) => {
      createTraining({
        title: values.title,
        description: values.description,
      });

      formikBag.resetForm();
    };

  return (
    <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    >
      {formikProps => (
        <Form className={styles.form}>
          <Input label='Title' type='text' name='title' placeholder='Training title...'
          classes={classes} />
          <Input label='Description' type='text' name='description' placeholder='Training description...'
          classes={classes} />
          <button type='submit' className={styles.submitBtn}>Save</button>
        </Form>
      )}
    </Formik>
  )
}

const mapDispatchToProps = dispatch => ({
  createTraining: data => dispatch(createTrainingThunk(data)),
});

export default connect(null, mapDispatchToProps) (CreateTrainingForm);