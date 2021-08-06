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
} from "reactstrap";
import classnames from "classnames";
import TeacherSchedule from "./TeacherScheduleComponent";
import { TeacherCreator } from "./CreateTeacher";
import { TeacherUpdater } from "./UpdateTeacher";
import { fetcher } from "../services/fetcher";
import TeacherGroupSchedule from "./TeacherGroupScheduleComponent";

export default class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };
    this.state = { teachers: [], teacher: null };
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
        </Nav>
        <TeacherCreator></TeacherCreator>
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
        <h1 className="perfectdark">Hello {this.state.teacher?.firstName}</h1>
        <h3>Link: {this.state.teacher?.link}</h3>
        <div className="row">
          <Label for="scheduleTeacher">Select Teacher</Label>
          <select id="scheduleTeacher" onChange={this.onChange}>
            <option selected>None</option>
            {this.state.teachers
              .filter((teacher) => teacher.campus.id === this.props?.campus.id)
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
            <h3>Still a work in progress!</h3>
            {this.state.teacher && (
              <TeacherGroupSchedule
                teacher={this.state.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherGroupSchedule>
            )}
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}
