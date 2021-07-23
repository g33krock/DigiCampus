import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { Card, CardText, CardTitle } from "reactstrap";
import { GradebookCreator } from "./CreateGradebook";
import { TrackerCreator } from "./CreateTracker";
import { StudentInfo } from "./StudentInfo";
import { fetcher } from '../services/fetcher';

export default class TeacherSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = { teacherschedule: [], teachersched: [], modal: false };
  }

  componentDidMount(){
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
    const teacher = this.props.teacher;
    const teacherSchedBox = this.state.teacherschedule
      .sort(function (a, b) {
        return a.period - b.period;
      })
      .map((teachersched) => {
        return (
          <div key={teachersched.id} className="col">
            <Card onClick={() => this.setSchedule(teachersched)}>
              <CardTitle>Period: {teachersched.period}</CardTitle>
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
                <a class="link">Class Link</a>
                {/* <script  type="text/javascript">
                    $("a.link").on("click",function(){
                        window.open(this.props.teacher?.link,'_blank')
                    });
                </script> */}
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

              <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
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
