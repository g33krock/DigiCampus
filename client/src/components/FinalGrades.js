import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../store/students';
import { createGrades } from '../store/finalGrades';
import { fetcher } from '../services/fetcher';
import { baseURL } from '../baseURL';

import styles from '../styles/FinalGrades.module.css';

class FinalGrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teacherSchedule: [] }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // TODO: replace hardcoded number with props teacher id
    fetcher(`${baseURL}/teachers/${this.props.teacher.id}/schedules`) //Fetch TeacherSchedule Table from API
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
    console.log("STATE: ", this.state);

    let keys = Object.keys(this.state);

    keys = keys.filter(key => key !== "teacherSchedule");

    let grades = [];

    keys.forEach(id => {
      const grade = this.state[id];
      let newGrade = {
        scheduleId: id,
        grade,
      };

      grades.push(newGrade);
    });

    //UNCOMMENT THIS LINE TO POST GRADES TO DB
    // grades.forEach(grade => this.props.postGrades(grade));
  }

  handleChange(id, e) {
    e.preventDefault();
    this.setState({
      [id]: e.target.value,
    });
  }

  render() {
    const { handleSubmit, handleChange } = this;

    const schedule = this.state.teacherSchedule.sort((a, b) => {
      return a.period - b.period;
    });
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
      <Input student={scheduleObj.student} course={scheduleObj.course} handleChange={handleChange} id={scheduleObj.id} />
    </div>
  );
};

const Input = ({ student, course, handleChange, id }) => {
  if (student.grade < 9 && course.subject === "Elective") {
    return (
      // return an input field with choices 'satisfactory' and 'needs improvement'
      <select defaultValue="" onChange={(e) => handleChange(id, e)}>
        <option hidden value="">Select a grade</option>
        <option value="Satisfactory">Satisfactory</option>
        <option value="Needs Improvement">Needs Improvement</option>
      </select>
    );
  } else {
    return (
      // return an input field with letter grades
      <select defaultValue="" onChange={(e) => handleChange(id, e)}>
        <option hidden value="">Select a grade</option>
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
    postGrades: (grade) => dispatch(createGrades(grade)),
  };
};

export default connect(mapState, mapDispatch)(FinalGrades);
