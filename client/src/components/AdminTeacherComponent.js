import React, { Component } from "react";
import { baseURL } from "../baseURL";
import {
  Container,
  Label,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Row,
  Form,
  Col,
  Input,
  Button,
} from "reactstrap";
import classnames from "classnames";
import TeacherSchedule from "./TeacherScheduleComponent";
import { TeacherCreator } from "./CreateTeacher";
import { TeacherUpdater } from "./UpdateTeacher";
import { fetcher } from "../services/fetcher";
import TeacherGroupSchedule from "./TeacherGroupScheduleComponent";
import { StaffAttendanceCreator } from "./CreateStaffAttendance";
import TeacherTrackerResponse from "./TeacherTrackerResponses";

export default class AdminTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };
    this.state = {
      teachers: [],
      teacher: null,
      startDate: null,
      endDate: null,
    };
  }

  componentDidMount() {
    // Fetch Student Table from API
    fetcher(`${baseURL}/teachers`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          teachers: data,
        });
      });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  async saveTheDate() {
    const date = await this.setState({
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
    });
    console.log(date);
    console.log(`Start: ${this.state.startDate}  End: ${this.state.endDate}`);
  }

  getStaffAttendance() {
    fetcher(`${baseURL}/staffAttendance`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((attendances) => {
        attendances.sort(
          (attendancea, attendanceb) => attendancea?.date - attendanceb?.date
        );
        this.setState({
          staffAttendance: attendances,
        });
        console.log(this.state.staffAttendance);
      });
  }

  onChange = (e) => {
    const teacherId = Number(e.target.value);
    const teacher = this.state.teachers.find(
      (teacher) => teacher.id === teacherId
    );
    this.setState({ teacher });
    console.log(this.state);
    console.log(e.target.value);
  };

  render() {
    return (
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              One to One
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Group
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Attendance
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Tracker Entries
            </NavLink>
          </NavItem>
        </Nav>
        <Row>
          <Col md="2">
            <TeacherCreator></TeacherCreator>
          </Col>
          <Col md="2">
            <TeacherUpdater
              teacherId={this.state.teacher?.id}
              teacherFirstName={this.state.teacher?.firstName}
              teacherLastName={this.state.teacher?.lastName}
              teacherBirthDate={this.state.teacher?.birthDate}
              teacherRole={this.state.teacher?.role.id}
              teacherCampus={this.state.teacher?.campus.id}
              teacherEmail={this.state.teacher?.email}
              teacherPhone={this.state.teacher?.phone}
              teacherLink={this.state.teacher?.link}
              teacherElementary={this.state.teacher?.elementary}
              teacherMiddle={this.state.teacher?.middle}
              teacherHighschoolMath={this.state.teacher?.math}
              teacherHighschoolELA={this.state.teacher?.ELA}
              teacherHighschoolHistory={this.state.teacher?.history}
              teacherHighschoolScience={this.state.teacher?.science}
              teacherElective={this.state.teacher?.elective}
              teacherP1={this.state.teacher?.pOne}
              teacherP2={this.state.teacher?.pTwo}
              teacherP3={this.state.teacher?.pThree}
              teacherP4={this.state.teacher?.pFour}
              teacherP5={this.state.teacher?.pFive}
              teacherP6={this.state.teacher?.pSix}
              teacherP7={this.state.teacher?.pSeven}
              teacherP8={this.state.teacher?.pEight}
              teacherP9={this.state.teacher?.pNine}
              teacherP10={this.state.teacher?.pTen}
            ></TeacherUpdater>
          </Col>
          <Col md="8">
            <Form>
              <Row>
                <Col md="3">
                  <Label for="startDate">
                    <small>Start Date</small>
                  </Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="Start"
                  />
                </Col>
                <Col md="3">
                  <Label for="endDate">
                    <small>End Date</small>
                  </Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="End"
                  />
                </Col>
                <Col md="2">
                  <Button
                    color="link"
                    size="sm"
                    onClick={() => {
                      this.saveTheDate();
                    }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <h1 className="perfectdark">
          <img
            style={{ width: 80, height: 80, borderRadius: 60 / 2 }}
            src={this.state.teacher?.image}
          />
          Hello {this.state.teacher?.firstName}{" "}
        </h1>
        <h3>Link: {this.state.teacher?.link}</h3>
        <div className="row">
          <Label for="scheduleTeacher">Select Teacher</Label>
          <select id="scheduleTeacher" onChange={this.onChange}>
            <option selected>None</option>
            {this.state.teachers
              .sort(function (a, b) {
                let x = a.firstName.toLowerCase();
                let y = b.firstName.toLowerCase();
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              })
              .map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
          </select>
        </div>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.state.teacher && (
              <TeacherSchedule
                teacher={this.state.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherSchedule>
            )}
          </TabPane>
          <TabPane tabId="2">
            <h3>Mic Drop... Boom!</h3>
            {this.state.teacher && (
              <TeacherGroupSchedule
                teacher={this.state.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherGroupSchedule>
            )}
          </TabPane>
          <TabPane tabId="3">
            <h3>Staff Attendance</h3>
            {this.state.teacher && (
              <StaffAttendanceCreator
                callback={() => this.getStaffAttendance()}
                startDate={this.state?.startDate}
                endDate={this.state?.endDate}
                teacher={this.state.teacher}
                campus={this.state.teacher.campus}
                userEmail={this.props?.userEmail}
              ></StaffAttendanceCreator>
            )}
            {/* {this.state.teacher && (
              <StaffAttendance
                teacher={this.state.teacher}
                campus={this.state.teacher.campus}
                userEmail={this.props?.userEmail}
              ></StaffAttendance>
            )} */}
          </TabPane>
          <TabPane tabId="4">
            {this.state.teacher && (
              <TeacherTrackerResponse
                startDate={this.state?.startDate}
                endDate={this.state?.endDate}
                teacher={this.state.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherTrackerResponse>
            )}
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}
