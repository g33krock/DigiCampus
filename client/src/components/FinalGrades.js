import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../store/students';
import { fetcher } from '../services/fetcher';
import { baseURL } from '../baseURL';

import styles from '../styles/FinalGrades.module.css';

class FinalGrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teacherSchedule: [], }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // TODO: replace hardcoded number with props teacher id
    fetcher(`${baseURL}/teachers/${28}/schedules`) //Fetch TeacherSchedule Table from API
      .then((response) => response.json()) //Convert response to a JSON object
      .then((data) => {
        this.setState({
          teacherSchedule: data,
        });
      });
  }

  // TODO: edit handleSubmit and handleChange so they organize the data and send it
  //        a backend where it can be further processed

  handleSubmit(e) {
    e.preventDefault();
    console.log("submitting");
  }

  handleChange(e) {
    e.preventDefault();
    console.log("CHANGE: ", e.target.value);
  }

  render() {
    const { handleSubmit, handleChange } = this;
    console.log("TEACHER--> ", this.props.teacher);

    const schedule = this.state.teacherSchedule.sort((a, b) => {
      return a.period - b.period;
    });
    console.log("teacherSchedule ---> ", schedule);
    let currentPeriod = 0;

    return (
      <div className={styles.container}>
        <h2>Final Grades (Fall 2021 Semester)</h2>
        <form onSubmit={handleSubmit}>
          {
            schedule.map((scheduleObj) => {
              if (scheduleObj.course.name === 'Lunch') {
                return <></>
              }
              else if (scheduleObj.period !== currentPeriod) {
                currentPeriod = scheduleObj.period;
                return (
                  <>
                    <h3>Period {currentPeriod}: {scheduleObj.course.name}</h3>
                    <Entry scheduleObj={scheduleObj} handleChange={handleChange} />
                  </>
                )
              } else {
                return (
                  <Entry scheduleObj={scheduleObj} handleChange={handleChange} />
                )
              }
            })
          }
          <button>Submit</button>
        </form>
      <p>Happy Holidays!</p>
      </div>
    );
  }
}

const Entry = ({ scheduleObj, handleChange }) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {scheduleObj.student.firstName} {scheduleObj.student.lastName}
      </label>
      <Input student={scheduleObj.student} course={scheduleObj.course} handleChange={handleChange} />
    </div>
  );
};

const Input = ({ student, course, handleChange }) => {
  if (student.grade < 9 && course.subject === "Elective") {
    return (
      // return an input field with choices 'satisfactory' and 'needs improvement'
      <select onChange={handleChange}>
        <option value="satisfactory">Satisfactory</option>
        <option value="needsImprovement">Needs Improvement</option>
      </select>
    );
  } else {
    return (
      // return an input field with letter grades
      <select onChange={handleChange}>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option>
      </select>
    );
  }
};

const mapState = (state) => {
  return {
    teachers: state.teachers,
    teacher: state.teacher,
    students: state.students,
  }
};

const mapDispatch = (dispatch) => {
  return {
    loadStudents: () => dispatch(fetchStudents()),
  };
};

export default connect(mapState, mapDispatch)(FinalGrades);
