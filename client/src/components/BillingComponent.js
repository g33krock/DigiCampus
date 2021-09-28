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

  calcMinutes(minutes, scope){
      switch(scope){
        case 'Daily':
            return (minutes * 45).toFixed(2);
        case 'Weekly':
            return ((minutes/5) * 45).toFixed(2);
        case 'Monthly':
            return ((minutes/20.5) * 45).toFixed(2);
        case 'Quarterly':
            return ((minutes/45) * 45).toFixed(2);
        case 'Semi-Annually':
            return ((minutes/90) * 45).toFixed(2);
        case 'Annually':
            return ((minutes/180) * 45).toFixed(2);
      }
  }

  render() {
    return (
      <div>
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
                    <th>PT</th>
                    <th>ABA</th>
                    <th>Music</th>
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
                      <td>{this.calcMinutes(student.counselingMinutes, student.counselingScope)} <small>Quarterly</small><br/>{student.counselingMinutes}<small>minutes/{student.counselingScope}</small></td>
                      <td>{this.calcMinutes(student.speechMinutes, student.speechScope)} <small>Quarterly</small><br/>{student.speechMinutes}<small>minutes/{student.speechScope}</small></td>
                      <td>{this.calcMinutes(student.otMinutes, student.otScope)} <small>Quarterly</small><br/>{student.otMinutes}<small>minutes/{student.otScope}</small></td>
                      <td>{this.calcMinutes(student.ptMinutes, student.ptScope)} <small>Quarterly</small><br/>{student.ptMinutes}<small>minutes/{student.ptScope}</small></td>
                      <td>{this.calcMinutes(student.abaMinutes, student.abaScope)} <small>Quarterly</small><br/>{student.abaMinutes}<small>minutes/{student.abaScope}</small></td>
                      <td>{this.calcMinutes(student.musicMinutes, student.musicScope)} <small>Quarterly</small><br/>{student.musicMinutes}<small>minutes/{student.musicScope}</small></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
            )}
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}
