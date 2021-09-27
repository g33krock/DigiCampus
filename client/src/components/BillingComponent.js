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
import classnames from "classnames";
import { isNull } from "lodash";
import { guardianService } from "../services/guardianService";
import { scheduleService } from "../services/scheduleService";
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
    //   schedules: [],
    //   guardians: [],
    };
  }

  async componentDidMount() {
    const students = await studentService.all();
    // const schedules = await scheduleService.all();
    // const guardians = await guardianService.all();
    this.setState({ students });
    // this.setState({ schedules });
    // this.setState({ guardians });
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
                <thead class="shadow">
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
            <TabPane tabId="2">District</TabPane>
          </TabContent>
        </div>
      </Container>
    );
  }
}
