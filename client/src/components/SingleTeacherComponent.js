import React, { Component } from "react";
import { baseURL } from "../baseURL";
import { Container, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import classnames from "classnames";
import TeacherSchedule from "./TeacherScheduleComponent";
import TeacherGroupSchedule from "./TeacherGroupScheduleComponent";
import { fetcher } from "../services/fetcher";
import TeacherTrackerResponse from "./TeacherTrackerResponses";

export default class SingleTeacher extends Component {
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
      })
      .then(() => {
        this.setState({
          teacher: this.state.teachers.find(
            (teacher) => teacher.email === this.props?.userEmail
          ),
        });
      });
    console.log(this.props?.userEmail);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

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
              Tracker Entries
            </NavLink>
          </NavItem>
        </Nav>
        <h1 className="perfectdark">Hello {this.state.teacher?.firstName}</h1>
        <h3>Link: {this.state.teacher?.link}</h3>
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
            <h3>Ahoy!</h3>
            {this.state.teacher && (
              <TeacherGroupSchedule
                teacher={this.state.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherGroupSchedule>
            )}
          </TabPane>
          <TabPane tabId="3">
            {this.state.teacher && (
              <TeacherTrackerResponse
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
