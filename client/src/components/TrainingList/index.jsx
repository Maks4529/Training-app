import { useEffect } from 'react';
import {connect} from 'react-redux';
import { getTrainingThunk, deleteTrainingThunk } from './../../store/slices/trainingsSlice';
import { addTrainingToUserThunk } from '../../store/slices/usersSlice';
import styles from './TrainingList.module.sass';

function TrainingList({trainings, isFetching, error, currentUser, getTrainings, deleteTraining, addTrainingToUser}) {
  useEffect(() => {
    getTrainings();
  }, []);

  const handleAddTraining = trainingId => {
    if (!currentUser?.id){
      return alert('User not logged in')
    }

    addTrainingToUser({userId: currentUser.id, trainingId});
  };

  return (
    <>
      <ul className={styles.trainingList}>
        {trainings.map(t => (
          <li className={styles.training} key={t.id}>
            <div className={styles.textContainer}>
              <h3 className={styles.title}>{t.title}</h3>
              <p className={styles.description}>{t.description}</p>
            </div>
            <div className={styles.btnContainer}>
            <button className={styles.trainingBtn} onClick={() => {deleteTraining(t.id)}}>X</button>
            <button className={styles.trainingBtn} onClick={() => {handleAddTraining(t.id)}}>Add</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

const mapStateToProps = ({ trainingsData, usersData }) => ({...trainingsData, currentUser: usersData.currentUser});

const mapDispatchToProps = dispatch => ({
  getTrainings: () => dispatch(getTrainingThunk()),
  deleteTraining: (id) => dispatch(deleteTrainingThunk(id)),
  addTrainingToUser: ({userId, trainingId}) => dispatch(addTrainingToUserThunk({userId, trainingId})),
});

export default connect(mapStateToProps, mapDispatchToProps) (TrainingList);