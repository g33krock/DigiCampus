import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchSchedules } from '../store/schedules';
import { fetchGrades, createGrades } from '../store/finalGrades';
import styles from '../styles/GradeSheet.module.css';

import EditGradeForm from './EditGradeForm';

class GradeSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      campus: null,
    };
    this.handleAddGrade = this.handleAddGrade.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const role = this.props.teacher.role.id;
    const campus = (role === 10 || role === 5) ? null : this.props.teacher.campus.name;

    this.props.loadSchedules();
    this.props.loadGrades(campus);

    this.setState({ loading: false, campus });
  }

  handleAddGrade(campus, student, course, teacher, e) {
    e.preventDefault();
    const gradeValue = e.target.grade.value;

    const gradeObj = {
      student: {
        firstName: student.firstName,
        lastName: student.lastName,
        grade: student.grade,
      },
      course: {
        name: course.name,
        period: course.period,
      },
      teacher: {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
      },
      grade: gradeValue,
      campus: campus,
    };

    this.props.postNewGrade(gradeObj);
    console.log('NEW GRADE: ', gradeObj);
  }

  handleChange(id, e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    const { loading, campus } = this.state;
    const { schedules, grades } = this.props;

    if (loading) {
      return <div>loading... please wait!</div>;
    }

    const filteredSchedules = schedules
      .filter((schedule) => {
        return campus
          ? schedule.campus.name === campus && schedule.status !== null
          : schedule.status !== null;
      })
      .map((schedule) => {
        return {
          campus: schedule.campus.name,
          grade: 'NOT SUBMITTED',
          course: {
            name: schedule.course.name,
            period: schedule.period,
          },
          student: {
            firstName: schedule.student.firstName,
            lastName: schedule.student.lastName,
            grade: schedule.student.grade,
          },
          teacher: {
            firstName: schedule.teacher.firstName,
            lastName: schedule.teacher.lastName,
          },
        };
      });

    let allGrades = [...grades];

    filteredSchedules.forEach((schedule) => {
      let found = false;

      grades.forEach((grade) => {
        let match = true;
        if (
          grade.student.firstName !== schedule.student.firstName ||
          grade.student.lastName !== schedule.student.lastName ||
          grade.course.period !== schedule.course.period
        ) {
          match = false;
        }

        if (match) found = true;
      });

      if (!found) allGrades.push(schedule);
    });

    let teachers = [
      ...new Set(
        allGrades.map(
          (grade) => `${grade.teacher.firstName} ${grade.teacher.lastName}`
        )
      ),
    ].sort();

    return (
      <div className={styles.container}>
        <h1>Final Grades</h1>
        {teachers.map((teacher, idx) => {
          const teacherGrades = allGrades.filter((grade) => {
            return (
              `${grade.teacher.firstName} ${grade.teacher.lastName}` === teacher
            );
          });

          return (
            <GradeCluster
              handleAddGrade={this.handleAddGrade}
              handleChange={this.handleChange}
              teacher={teacher}
              grades={teacherGrades}
              key={idx}
            />
          );
        })}
      </div>
    );
  }
}

const GradeCluster = (props) => {
  const { teacher, grades } = props;
  return (
    <div>
      <h3>{teacher}</h3>
      <div className={styles.grid}>
        <h5>Campus</h5>
        <h5>Student</h5>
        <h5>Course</h5>
        <h5>Period</h5>
        <h5>Grade</h5>
        <h5>Edit</h5>
        {grades
          .sort((a, b) => a.course.period - b.course.period)
          .map((grade, idx) => {
            return (
              <GradeRow key={idx} grade={grade} handleAddGrade={props.handleAddGrade} handleChange={props.handleChange} />
            );
          })}
      </div>
    </div>
  );
};

const GradeRow = (props) => {
  const [editToggle, setEditToggle] = useState(false);
  const [addToggle, setAddToggle] = useState(false);

  const { handleAddGrade } = props;

  const { grade } = props;
  const { course, student, teacher } = grade;
  console.log('GRADE ROW: ', grade);
  return (
    <>
      <p className={styles.cell}>{grade.campus}</p>
      <p className={styles.cell}>
        {student.firstName} {student.lastName}
      </p>
      <p className={styles.cell}>{course.name}</p>
      <p className={styles.cell}>{course.period}</p>
      <p className={styles.cell}>{grade.grade}</p>
      {grade.grade === 'NOT SUBMITTED' ? (
        <button onClick={() => setAddToggle(true)}>Add</button>
      ) : (
        <button onClick={() => setEditToggle(true)}>Edit</button>
      )}
      {addToggle ? (
        <form
          className={styles.form}
          onSubmit={(e) => {
            handleAddGrade(grade.campus, student, course, teacher, e);
            setAddToggle(false);
          }}
        >
          <label>Grade:</label>
          <select defaultValue="" name="grade">
            <option hidden value="">
              Select a grade
            </option>
            <option value="A+">A+ (97-100)</option>
            <option value="A">A (93-96)</option>
            <option value="A-">A- (90-92)</option>
            <option value="B+">B+ (87-89)</option>
            <option value="B">B (83-86)</option>
            <option value="B-">B- (80-82)</option>
            <option value="C+">C+ (77-79)</option>
            <option value="C">C (73-76)</option>
            <option value="C-">C- (70-72)</option>
            <option value="D+">D+ (67-69)</option>
            <option value="D">D (63-66)</option>
            <option value="D-">D- (60-62)</option>
            <option value="F">F (below 60)</option>
            <option value="Satisfactory">Satisfactory</option>
            <option value="Needs Improvement">Needs Improvement</option>
            <option value="In Progress">In Progress</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <></>
      )}
      {editToggle ? (
        <EditGradeForm student={student} campus={grade.campus} course={course} teacher={teacher} grade={grade.grade} />
      ) : (
        <></>
      )}
    </>
  );
};

const mapState = (state) => ({
  grades: state.finalGrades,
  schedules: state.schedules,
  teacher: state.teacher,
});

const mapDispatch = (dispatch) => ({
  loadGrades: (campus) => dispatch(fetchGrades(campus)),
  loadSchedules: () => dispatch(fetchSchedules()),
  postNewGrade: (grade) => dispatch(createGrades(grade)),
});

export default connect(mapState, mapDispatch)(GradeSheet);
