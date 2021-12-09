import React, { Component } from "react";
import { baseURL } from "../baseURL";
import { Card, CardText, CardTitle, Col, Row } from "reactstrap";
import { fetcher } from "../services/fetcher";
import { GroupTrackerCreator } from "./CreateGroupTrackers";
import { GroupGradebookCreator } from "./CreateGroupGradebook";

export default class TeacherGroupSchedule extends Component {
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
    const teacher = this.props.teacher;
    const p1 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 1
    );
    const p2 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 2
    );
    const p3 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 3
    );
    const p4 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 4
    );
    const p5 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 5
    );
    const p6 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 6
    );
    const p7 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 7
    );
    const p8 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 8
    );
    const p9 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 9
    );
    const p10 = this.state.teacherschedule.filter(
      (teacher) => teacher.period === 10
    );
    const teacherSchedBox = this.state.teacherschedule.map((teachersched) => {
      let block;
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
      return (
        <div key={teachersched.id} id="redBrick">
          <Row>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 7:50 - 8:40</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p1.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="1"
                    block={p1}
                    teacher={teachersched}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="1"
                    block={p1}
                    teacher={teachersched}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 8:40 - 9:30</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p2.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="2"
                    block={p2}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="2"
                    block={p2}
                    teacher={teachersched}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 9:30 - 10:20</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p3.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="3"
                    block={p3}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="3"
                    block={p3}
                    teacher={teachersched}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 10:20-11:10</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p4.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="4"
                    block={p4}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="4"
                    block={p4}
                    teacher={teachersched}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 11:10-12:00</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p5.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="5"
                    block={p5}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="5"
                    block={p5}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 12:00-12:50</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p6.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="6"
                    block={p6}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="6"
                    block={p6}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 12:50-1:40</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p7.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="7"
                    block={p7}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="7"
                    block={p7}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 1:40-2:30</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p8.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="8"
                    block={p8}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="8"
                    block={p8}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 2:30-3:20</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p9.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="9"
                    block={p9}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="9"
                    block={p9}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
            <Col xs="3">
              <Card className="border-primary p-2 h-100 m-2" id="winterWindow" onClick={() => this.setSchedule(teachersched)}>
                <CardTitle>Period: 3:20-4:10</CardTitle>
                <CardText style={{ color: "black" }}>
                  <p>
                    Student:<br></br>
                    {p10.map((students) => (
                      <div>
                        <small>
                          {students.student?.firstName}{" "}
                          {students.student?.lastName} Subject:{" "}
                          {students.course?.name} {students.course.subject}
                        </small>
                      </div>
                    ))}
                  </p>
                  <GroupTrackerCreator
                    period="10"
                    block={p10}
                  ></GroupTrackerCreator>
                  <GroupGradebookCreator
                    period="10"
                    block={p10}
                  ></GroupGradebookCreator>
                  <p>
                    Teacher:<br></br>
                    {this.props.teacher?.firstName}{" "}
                    {this.props.teacher?.lastName}
                  </p>
                </CardText>

                {/* <TrackerCreator
                student={teachersched.student}
                teacher={teachersched.teacher}
                course={teachersched.course}
                period={teachersched.period}
                schedule={teachersched}
              ></TrackerCreator> */}
              </Card>
            </Col>
          </Row>
        </div>
      );
    });

    return (
      <div className="container" id="schedBox">
        Schedule for {teacher.firstName} {teacher.lastName}
        <div className="row">{teacherSchedBox[0]}</div>
      </div>
    );
  }
}
