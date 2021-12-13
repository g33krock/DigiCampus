import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../store/students';
import { createGrades } from '../store/finalGrades';
import { fetcher } from '../services/fetcher';
import { baseURL } from '../baseURL';

import { db } from '../store/firebase';

import styles from '../styles/FinalGrades.module.css';

class FinalGrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teacherSchedule: [], newInputs: [], }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddInput = this.handleAddInput.bind(this);
    this.handleAdditionalChange = this.handleAdditionalChange.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    let keys = Object.keys(this.state);

    keys = keys.filter(key => key !== "teacherSchedule" && key !== "newInputs");

    let grades = [];

    keys.forEach(id => {
      const grade = this.state[id];

      grades.push(grade);
    });

    grades.forEach(grade => this.props.postGrades(grade));
  }

  handleChange(scheduleObj, id, e) {
    e.preventDefault();
    console.log("SCHEDULE OBJECT: ", scheduleObj);
    const { course, period, student, teacher } = scheduleObj;
    this.setState({
      [id]: {
        student: {
          firstName: student.firstName,
          lastName: student.lastName,
          grade: student.grade,
        },
        course: {
          name: course.name,
          period,
          subject: course.subject,
        },
        teacher: {
          firstName: teacher.firstName,
          lastName: teacher.lastName,
        },
        grade: e.target.value,
        campus: "add campus", // TODO: after merged changes replace with campus from scheduleObj
      },
    });
  }

  handleAddInput() {
    const newInput = {
      id: this.state.newInputs.length,
      student: {
        firstName: "",
        lastName: "",
        grade: "",
        campus: "",
      },
      course: {
        name: "",
        period: "",
      },
      teacher: {
        firstName: "",
        lastName: "",
      },
      grade: "",
    };

    this.setState(prevState => ({ newInputs: prevState.newInputs.concat([newInput]) }));
    console.log(this.state);
  }

  handleAdditionalChange(id, e) {
    let entries = [...this.state.newInputs];
    let entry = { ...entries[id] };
    let name = e.target.name.split(".");

    console.log("STATE: ", this.state);
    if (name.length === 1) {
      entry[name[0]] = e.target.value;
    } else {
      let [parent, child] = name;
      console.log("parent: ", parent);
      console.log("child: ", child);
      entry[parent][child] = e.target.value;
    }

    entries[id] = entry;

    console.log(entry);
    this.setState({
      newInputs: entries,
    });
  }

  render() {
    const { handleSubmit, handleChange, handleAddInput } = this;

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
          <div>
            <span>Any students you don&apos;t see here?</span>
            <button type="button" onClick={handleAddInput}>Add a new student</button>
            {
              this.state.newInputs.map(input => (
                <AdditionalInput
                  key={input.id}
                  id={input.id}
                  student={input.student}
                  course={input.course}
                  teacher={input.teacher}
                  grade={input.grade}
                  handleChange={this.handleAdditionalChange}
                />
              ))
            }
          </div>
          <button type="submit">Submit</button>
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
      <Input handleChange={handleChange} id={scheduleObj.id} scheduleObj={scheduleObj} />
    </div>
  );
};

const Input = ({ handleChange, id, scheduleObj }) => {
  if (scheduleObj.student.grade < 9 && scheduleObj.course.subject === "Elective") {
    return (
      // return an input field with choices 'satisfactory' and 'needs improvement'
      <select defaultValue="" onChange={(e) => handleChange(scheduleObj, id, e)}>
        <option hidden value="">Select a grade</option>
        <option value="Satisfactory">Satisfactory</option>
        <option value="Needs Improvement">Needs Improvement</option>
      </select>
    );
  } else {
    return (
      // return an input field with letter grades
      <select defaultValue="" onChange={(e) => handleChange(scheduleObj, id, e)}>
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

const AdditionalInput = ({ id, student, course, grade, handleChange }) => {
  console.log("ID: ", id);
  return (
    <div className="field">
      <label>Student Name</label>
      <input
        type="text"
        placeholder="first"
        name="student.firstName"
        value={student.firstName}
        onChange={(e) => handleChange(id, e)}
      />
      <input
        type="text"
        placeholder="last"
        name="student.lastName"
        value={student.lastName}
        onChange={(e) => handleChange(id, e)}
      />
      <label>Course</label>
      <input
        type="text"
        placeholder="course"
        name="course.name"
        value={course.name}
        onChange={(e) => handleChange(id, e)}
      />
      <input
        type="text"
        placeholder="period"
        name="course.period"
        value={course.period}
        onChange={(e) => handleChange(id, e)}
      />
      <label>Grade</label>
      <input
        type="text"
        placeholder="grade"
        name="grade"
        value={grade}
        onChange={(e) => handleChange(id, e)}
      />
    </div>
  )
}

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
