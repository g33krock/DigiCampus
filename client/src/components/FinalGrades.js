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
    this.state = { teacherSchedule: [], newInputs: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddInput = this.handleAddInput.bind(this);
    this.handleAdditionalChange = this.handleAdditionalChange.bind(this);
  }

  componentDidMount() {
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

    keys = keys.filter(
      (key) => key !== 'teacherSchedule' && key !== 'newInputs'
    );

    let grades = [];

    keys.forEach((id) => {
      const grade = this.state[id];
      grades.push(grade);
    });

    grades.forEach((grade) => this.props.postGrades(grade));
    this.state.newInputs.forEach((grade) => this.props.postGrades(grade));

    this.props.history.push('/home');
  }

  handleChange(scheduleObj, id, e) {
    e.preventDefault();
    const { course, period, student, teacher, campus } = scheduleObj;
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
        campus: campus.name,
      },
    });
  }

  handleAddInput() {
    const newInput = {
      id: this.state.newInputs.length,
      student: {
        firstName: '',
        lastName: '',
        grade: '',
      },
      course: {
        name: '',
        period: '',
      },
      teacher: {
        firstName: this.props.teacher.firstName,
        lastName: this.props.teacher.lastName,
      },
      grade: '',
      campus: '',
    };

    this.setState((prevState) => ({
      newInputs: prevState.newInputs.concat([newInput]),
    }));
  }

  handleAdditionalChange(id, e) {
    let entries = [...this.state.newInputs];
    let entry = { ...entries[id] };
    let name = e.target.name.split('.');

    if (name.length === 1) {
      entry[name[0]] = e.target.value;
    } else {
      let [parent, child] = name;
      entry[parent][child] = e.target.value;
    }

    entries[id] = entry;

    this.setState({
      newInputs: entries,
    });
  }

  render() {
    console.log(this.props);
    const { handleSubmit, handleChange, handleAddInput } = this;

    const schedule = this.state.teacherSchedule.sort((a, b) => {
      return a.period - b.period;
    });
    let currentPeriod = 0;

    return (
      <div className={styles.container}>
        <div className={styles.instructions}>
          <h2>Progress Reports (March 2022)</h2>
          <p>
            Please carefully fill out the form below to submit your progress report grades
            for the quarter.
          </p>
          <p>
            Elementary and middle school student group classes—Social Skills,
            STEAM, ART— receive either "Satisfactory" or "Needs Improvement."
            All other classes receive a letter grade.
          </p>
          <p>
            If the options presented for a particular student do not correspond
            with the guidelines above, please contact your campus coordinator.
          </p>
          <p>
            If you have a student who is not listed, you can manually add them
            and enter a grade for them.
          </p>
          <p>
            Once you click "submit" you will be taken back to the homepage, so
            double check to make sure the entries are correct. If you think you
            made a mistake, reach out to your campus coordinator to have the
            gradebook corrected before report cards are sent out.
          </p>
          <p>
            <strong>
              Note: if you have submitted this form already, please do not do so
              again.
            </strong>
          </p>
          <p>
            <strong>Have a great Spring Break! :-)</strong>
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {schedule.map((scheduleObj) => {
            if (scheduleObj.course.name === 'Lunch') {
              return <></>;
            } else if (scheduleObj.period !== currentPeriod) {
              currentPeriod = scheduleObj.period;
              return (
                <>
                  <h4>
                    Period {currentPeriod}: {scheduleObj.course.name}
                  </h4>
                  <Entry
                    scheduleObj={scheduleObj}
                    handleChange={handleChange}
                  />
                </>
              );
            } else {
              return (
                <Entry scheduleObj={scheduleObj} handleChange={handleChange} />
              );
            }
          })}
          <div className={styles.additionalStudents}>
            <h4>Any students you don&apos;t see here?</h4>
            <button type="button" onClick={handleAddInput}>
              Add a new student
            </button>
            <div className={styles.newInputs}>
              {this.state.newInputs.map((input) => (
                <AdditionalInput
                  key={input.id}
                  id={input.id}
                  student={input.student}
                  course={input.course}
                  teacher={input.teacher}
                  grade={input.grade}
                  campus={input.campus}
                  handleChange={this.handleAdditionalChange}
                />
              ))}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
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
      <Input
        handleChange={handleChange}
        id={scheduleObj.id}
        scheduleObj={scheduleObj}
      />
    </div>
  );
};

const Input = ({ handleChange, id, scheduleObj }) => {
  if (
    scheduleObj.student.grade < 9 &&
    scheduleObj.course.subject === 'Elective'
  ) {
    return (
      // return an input field with choices 'satisfactory' and 'needs improvement'
      <select
        defaultValue=""
        onChange={(e) => handleChange(scheduleObj, id, e)}
      >
        <option hidden value="">
          Select a grade
        </option>
        <option value="Satisfactory">Satisfactory</option>
        <option value="Needs Improvement">Needs Improvement</option>
        <option value="In Progress">In Progress</option>
      </select>
    );
  } else {
    return (
      // return an input field with letter grades
      <select
        defaultValue=""
        onChange={(e) => handleChange(scheduleObj, id, e)}
      >
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
        <option value="In Progress">In Progress</option>
      </select>
    );
  }
};

export const AdditionalInput = ({
  id,
  student,
  course,
  grade,
  campus,
  handleChange,
}) => {
  return (
    <div className={styles.additionalInput}>
      <div className={styles.field}>
        <label>Student</label>
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
        <input
          type="text"
          placeholder="grade (ex: 9)"
          name="student.grade"
          value={student.grade}
          onChange={(e) => handleChange(id, e)}
        />
      </div>
      <div className={styles.field}>
        <label>Campus</label>
        <input
          type="text"
          placeholder="campus"
          name="campus"
          value={campus}
          onChange={(e) => handleChange(id, e)}
        />
      </div>
      <div className={styles.field}>
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
      </div>
      <div className={styles.field}>
        <label>Grade</label>
        <input
          type="text"
          placeholder="grade"
          name="grade"
          value={grade}
          onChange={(e) => handleChange(id, e)}
        />
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    teachers: state.teachers,
    teacher: state.teacher,
    students: state.students,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadStudents: () => dispatch(fetchStudents()),
    postGrades: (grade) => dispatch(createGrades(grade)),
  };
};

export default connect(mapState, mapDispatch)(FinalGrades);
