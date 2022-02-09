import React, { Component } from "react";
import { baseURL } from "../baseURL";
import { Card, CardText, CardTitle } from "reactstrap";
import { GradebookCreator } from "./CreateGradebook";
import { TrackerCreator } from "./CreateTracker";
import { StudentInfo } from "./StudentInfo";
import { fetcher } from "../services/fetcher";
import { ClassGrades } from "./GradebookComponent";
import { TallyComponent } from "./TallyComponent";

export default class TeacherSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = { teacherschedule: [], teachersched: [], modal: false };
  }

  componentDidMount() {
    fetcher(`${baseURL}/teachers/${this.props.teacher?.id}/schedules`) //Fetch TeacherSchedule Table from API
      .then((response) => response.json()) //Convert response to a JSON object
      .then((data) => {
        console.log(data);
        this.setState({
          teacherschedule: data,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.teacher === this.props.teacher) {
      return;
    }
    console.log(this.props.teacher);
    fetcher(`${baseURL}/teachers/${this.props.teacher?.id}/schedules`) //Fetch TeacherSchedule Table from API
      .then((response) => response.json()) //Convert response to a JSON object
      .then((data) => {
        console.log(data);
        this.setState({
          teacherschedule: data, //Create relationship between teacherschedule state array and JSON object
        });
      });
  }

  setSchedule(teachersched) {
    this.setState({ teachersched: teachersched });
    this.setState({ modal: true });
    // this.setState({teacher: teachersched.teachers})       //sets teachersched property to teachersched object.  This looks funny because they both are named teachersched
  }

  render() {
    console.log("this.state.teacherschedule: ", this.state.teacherschedule);
    const teacher = this.props.teacher;
    const teacherSchedBox = this.state.teacherschedule
      .sort(function (a, b) {
        return a.period - b.period;
      })
      .map((teachersched) => {
        let block;
        let done;
        const date = new Date();
        if (
          teachersched?.lastUpdate ===
          `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
            "0" + date.getDate()
          ).slice(-2)}`
        ) {
          done = "winterWindow";
        } else {
          done = "closedWindow";
        }
        switch (teachersched.period) {
          case 1:
            block = "7:50 - 8:40";
            break;
          case 2:
            block = "8:40 - 9:30";
            break;
          case 3:
            block = "9:30 - 10:20";
            break;
          case 4:
            block = "10:20 - 11:10";
            break;
          case 5:
            block = "11:10 - 12:00";
            break;
          case 6:
            block = "12:00 - 12:50";
            break;
          case 7:
            block = "12:50 - 1:40";
            break;
          case 8:
            block = "1:40 - 2:30";
            break;
          case 9:
            block = "2:30 - 3:20";
            break;
          case 10:
            block = "3:20 - 4:10";
            break;

          default:
        }
        console.log("TEACHER SCHED OBJECT: ", teachersched);
        return (
          <div key={teachersched.id} className="col" id="redBrick">
            <Card className="p-2 h-100 cardSpace" onClick={() => this.setSchedule(teachersched)} id={done}>
              <CardTitle>Period: {block}</CardTitle>
              <CardText style={{ color: "black" }}>
                <p>
                  Student:{teachersched.student?.firstName}{" "}
                  {teachersched.student?.lastName}
                </p>
                <p>
                  Teacher:{this.props.teacher?.firstName}{" "}
                  {this.props.teacher?.lastName}
                </p>
                <p>Course Name:{teachersched.course?.name}</p>
                <p>Subject:{teachersched.course?.subject}</p>
                <a href={this.props.teacher?.link}>Class Link</a>
              </CardText>
              <StudentInfo student={teachersched.student}></StudentInfo>

              <GradebookCreator
                student={teachersched?.student}
                teacher={teachersched?.teacher}
                course={teachersched?.course}
                period={teachersched?.period}
                schedule={teachersched}
                campus={teachersched?.campus}
              ></GradebookCreator>

              <ClassGrades
                student={teachersched?.student}
                teacher={teachersched?.teacher}
                course={teachersched?.course}
                period={teachersched?.period}
                schedule={teachersched}
                campus={teachersched?.campus}
              ></ClassGrades>

              <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator>
            </Card>
          </div>
        );
      });

    return (
      <div className="container" id="schedBox">
        Schedule for {teacher.firstName} {teacher.lastName}
        <div className="row">{teacherSchedBox}</div>
      </div>
    );
  }
}
