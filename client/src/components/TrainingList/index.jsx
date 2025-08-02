import { useEffect } from 'react';
import {connect} from 'react-redux';
import { getTrainingThunk, deleteTrainingThunk } from './../../store/slices/trainingsSlice';
import styles from './TrainingList.module.sass';

function TrainingList({trainings, isFetching, error, getTrainings, deleteTraining}) {
  useEffect(() => {
    getTrainings();
  }, []);

  return (
    <>
      <ul className={styles.trainingList}>
        {trainings.map(t => (
          <li className={styles.training} key={t.id}>
            <div className={styles.textContainer}>
              <h3 className={styles.title}>{t.title}</h3>
              <p className={styles.description}>{t.description}</p>
            </div>
            <button className={styles.deleteBtn} onClick={() => {deleteTraining(t.id)}}>X</button>
          </li>
        ))}
      </ul>
    </>
  )
}

const mapStateToProps = ({ trainingsData }) => trainingsData;

const mapDispatchToProps = dispatch => ({
  getTrainings: () => dispatch(getTrainingThunk()),
  deleteTraining: (id) => dispatch(deleteTrainingThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps) (TrainingList);