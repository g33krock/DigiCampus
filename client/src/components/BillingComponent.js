import React, { Component } from "react";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";
import { baseURL } from "../baseURL";
import { fetcher } from "../services/fetcher";
import classnames from "classnames";
import { isNull } from "lodash";
import { studentService } from "../services/studentService";

export default class Billing extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
    };
    this.state = {
      students: [],
      districts: [],
    };
  }

  async componentDidMount() {
    const students = await studentService.all();
    this.setState({ students });
    fetcher(`${baseURL}/districts`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        districts: data,
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
              ESA
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              District
            </NavLink>
          </NavItem>
        </Nav>

        <div className="col-md-9">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Table>
                <thead>
                  <tr id="scheduleHeader">
                    <th>Student</th>
                    <th>Parent</th>
                    <th>Email</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Teacher</th>
                    <th>Para</th>
                    <th>Campus</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.students.filter(student => student?.funding?.id === 1).sort(function (a, b) {
                let x = a.firstName.toLowerCase();
                let y = b.firstName.toLowerCase();
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              }).sort(function (a, b) {
                let x = a.campuses?.name?.toLowerCase();
                let y = b.campuses?.name?.toLowerCase();
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              }).map((student) => (
                    <tr>
                      <th>
                        {student.firstName} {student.lastName}
                      </th>
                      <td>{student.guardians?.map(guardian => <small>{guardian.firstName} {guardian.lastName}<br/></small>)}</td>
                      <td>{student.guardians?.map(guardian => <small>{guardian.email}<br/></small>)}</td>
                      <td>{student.start}</td>
                      <td>{student.withdraw}</td>
                      <td>
                        {
                          student.schedules.filter(
                            (schedule) =>
                              schedule.course.subject === "ELA" ||
                              schedule.course.subject === "Math" ||
                              schedule.oneToOne === "true"
                          ).length
                        }
                      </td>
                      <td>
                        {
                          student.schedules.filter(
                            (schedule) =>
                              schedule?.para?.id !== 26 &&
                              schedule?.para?.id !== isNull &&
                              schedule?.para?.id >= 1
                            // schedule.course.id !== 48
                          ).length
                        }
                      </td>
                      <td>{student.campuses.name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TabPane>
            <TabPane tabId="2">
            {this.state.districts.map(district => 
            <Container><h3>{district.name}</h3>
                          <Table>
                <thead>
                  <tr id="scheduleHeader">
                    <th>Student</th>
                    <th>Parent</th>
                    <th>Email</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Teacher</th>
                    <th>Para</th>
                    <th>Campus</th>
                    <th>Counseling</th>
                    <th>Speech</th>
                    <th>OT</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.students.filter(student => student?.district?.id === district.id).sort(function (a, b) {
                let x = a.firstName.toLowerCase();
                let y = b.firstName.toLowerCase();
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              }).sort(function (a, b) {
                let x = a.campuses?.name?.toLowerCase();
                let y = b.campuses?.name?.toLowerCase();
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              }).map((student) => (
                    <tr>
                      <th>
                        {student.firstName} {student.lastName}
                      </th>
                      <td>{student.guardians?.map(guardian => <small>{guardian.firstName} {guardian.lastName}<br/></small>)}</td>
                      <td>{student.guardians?.map(guardian => <small>{guardian.email}<br/></small>)}</td>
                      <td>{student.start}</td>
                      <td>{student.withdraw}</td>
                      <td>
                        {
                          student.schedules.filter(
                            (schedule) =>
                              schedule.course.subject === "ELA" ||
                              schedule.course.subject === "Math" ||
                              schedule.oneToOne === "true"
                          ).length
                        }
                      </td>
                      <td>
                        {
                          student.schedules.filter(
                            (schedule) =>
                              schedule?.para?.id !== 26 &&
                              schedule?.para?.id !== isNull &&
                              schedule?.para?.id >= 1
                            // schedule.course.id !== 48
                          ).length
                        }
                      </td>
                      <td>{student.campuses.name}</td>
                      <td>{student.counselingMinutes}<small>minutes/month</small></td>
                      <td>{student.speechMinutes}<small>minutes/month</small></td>
                      <td>{student.otMinutes}<small>minutes/month</small></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
            )}
            </TabPane>
          </TabContent>
        </div>
      </Container>
    );
  }
}
