import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateGrade, deleteGrade } from '../store/finalGrades';
import styles from '../styles/EditGradeForm.module.css';

const EditGradeForm = (props) => {
  const [grade, setGrade] = useState(props.grade);

  const handleChange = (e, set) => {
    e.preventDefault();
    set(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGrade = {
      student: {
        firstName: props.student.firstName,
        lastName: props.student.lastName,
        grade: props.student.grade,
      },
      course: {
        name: props.course.name,
        period: props.course.period,
      },
      teacher: {
        firstName: props.teacher.firstName,
        lastName: props.teacher.lastName,
      },
      grade,
      campus: props.campus.name,
    };

    props.updateGrade(newGrade);
  }

  const handleDelete = (e) => {
    e.preventDefault();

    const newGrade = {
      student: {
        firstName: props.student.firstName,
        lastName: props.student.lastName,
        grade: props.student.grade,
      },
      course: {
        name: props.course.name,
        period: props.course.period,
      },
      teacher: {
        firstName: props.teacher.firstName,
        lastName: props.teacher.lastName,
      },
      grade: props.grade,
      campus: props.campus.name,
    };

    props.deleteGrade(newGrade);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Grade</label>
          <input
            type="text"
            placeholder="grade"
            name="grade"
            value={grade}
            onChange={(e) => handleChange(e, setGrade)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

const mapDispatch = (dispatch) => ({
  updateGrade: (grade) => dispatch(updateGrade(grade)),
  deleteGrade: (grade) => dispatch(deleteGrade(grade)),
});

export default connect(null, mapDispatch)(EditGradeForm);
