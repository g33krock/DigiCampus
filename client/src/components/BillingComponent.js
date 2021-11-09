import React, { Component } from "react";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Table,
  TabPane,
  Col,
  Form,
  Row,
  Label,
  Input,
  Button,
} from "reactstrap";
import { baseURL } from "../baseURL";
import { fetcher } from "../services/fetcher";
import classnames from "classnames";
import { isNull } from "lodash";
import { studentService } from "../services/studentService";
import { attendanceService } from "../services/attendanceService";

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
      district: null,
      startDate: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      attendance: [],
    };
  }

  async componentDidMount() {
    this.getAttendance();
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

  getAttendance() {
    attendanceService.all().then((attendance) => {
      this.setState({
        attendance,
      });
      console.log(this.state.attendance);
    });
  }

  onChange = (e) => {
    const districtId = Number(e.target.value);
    const district = this.state.districts.find(
      (district) => district.id === districtId
    );
    this.setState({ district });
    console.log(district);
    console.log(e.target.value);
    this.getAttendance();
  };

  async saveTheDate() {
    const date = await this.setState({
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
    });
    console.log(date);
    console.log(`Start: ${this.state.startDate}  End: ${this.state.endDate}`);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  calcMinutes(minutes, scope) {
    switch (scope) {
      case "Daily":
        return (minutes * 45).toFixed(2);
      case "Weekly":
        return ((minutes / 5) * 45).toFixed(2);
      case "Monthly":
        return ((minutes / 20.5) * 45).toFixed(2);
      case "Quarterly":
        return ((minutes / 45) * 45).toFixed(2);
      case "Semi-Annually":
        return ((minutes / 90) * 45).toFixed(2);
      case "Annually":
        return ((minutes / 180) * 45).toFixed(2);
      default:
        return minutes.toFixed(2);
    }
  }

  attendanceSwitch(randomInt) {
    switch (randomInt) {
      case 0:
        return "A";
      case 1:
        return "P";
      default:
        return "Incorporeal Being";
    }
  }

  render() {
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
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
                  {this.state.students
                    .filter((student) => student?.funding?.id === 1)
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
                    .sort(function (a, b) {
                      let x = a.campuses?.name?.toLowerCase();
                      let y = b.campuses?.name?.toLowerCase();
                      if (x < y) {
                        return -1;
                      }
                      if (x > y) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((student) => (
                      <tr>
                        <th>
                          {student.firstName} {student.lastName}
                        </th>
                        <td>
                          {student.guardians?.map((guardian) => (
                            <small>
                              {guardian.firstName} {guardian.lastName}
                              <br />
                            </small>
                          ))}
                        </td>
                        <td>
                          {student.guardians?.map((guardian) => (
                            <small>
                              {guardian.email}
                              <br />
                            </small>
                          ))}
                        </td>
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
              {this.state.districts
                .filter((district) => district?.id !== 19)
                .map((district) => (
                  <Container>
                    <h3>{district.name}</h3>
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
                        {this.state.students
                          .filter(
                            (student) => student?.district?.id === district.id
                          )
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
                          .sort(function (a, b) {
                            let x = a.campuses?.name?.toLowerCase();
                            let y = b.campuses?.name?.toLowerCase();
                            if (x < y) {
                              return -1;
                            }
                            if (x > y) {
                              return 1;
                            }
                            return 0;
                          })
                          .map((student) => (
                            <tr>
                              <th>
                                {student.firstName} {student.lastName}
                              </th>
                              <td>
                                {student.guardians?.map((guardian) => (
                                  <small>
                                    {guardian.firstName} {guardian.lastName}
                                    <br />
                                  </small>
                                ))}
                              </td>
                              <td>
                                {student.guardians?.map((guardian) => (
                                  <small>
                                    {guardian.email}
                                    <br />
                                  </small>
                                ))}
                              </td>
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
                              <td>
                                {this.calcMinutes(
                                  student.counselingMinutes,
                                  student.counselingScope
                                )}{" "}
                                <small>Quarterly</small>
                                <br />
                                {student.counselingMinutes}
                                <small>minutes/{student.counselingScope}</small>
                              </td>
                              <td>
                                {this.calcMinutes(
                                  student.speechMinutes,
                                  student.speechScope
                                )}{" "}
                                <small>Quarterly</small>
                                <br />
                                {student.speechMinutes}
                                <small>minutes/{student.speechScope}</small>
                              </td>
                              <td>
                                {this.calcMinutes(
                                  student.otMinutes,
                                  student.otScope
                                )}{" "}
                                <small>Quarterly</small>
                                <br />
                                {student.otMinutes}
                                <small>minutes/{student.otScope}</small>
                              </td>
                              <td>
                                {this.calcMinutes(
                                  student.ptMinutes,
                                  student.ptScope
                                )}{" "}
                                <small>Quarterly</small>
                                <br />
                                {student.ptMinutes}
                                <small>minutes/{student.ptScope}</small>
                              </td>
                              <td>
                                {this.calcMinutes(
                                  student.abaMinutes,
                                  student.abaScope
                                )}{" "}
                                <small>Quarterly</small>
                                <br />
                                {student.abaMinutes}
                                <small>minutes/{student.abaScope}</small>
                              </td>
                              <td>
                                {this.calcMinutes(
                                  student.musicMinutes,
                                  student.musicScope
                                )}{" "}
                                <small>Quarterly</small>
                                <br />
                                {student.musicMinutes}
                                <small>minutes/{student.musicScope}</small>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Container>
                ))}
            </TabPane>
            <TabPane tabId="3">
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
                      <br />
                      <Button
                        color="primary"
                        onClick={() => {
                          this.saveTheDate();
                        }}
                      >
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col sm={3}>
                <Label>Select District: </Label>
                <Input type="select" id="selectCampus" onChange={this.onChange}>
                  <option></option>
                  {this.state.districts.map((district) => (
                    <option value={district.id}>{district.name}</option>
                  ))}
                </Input>
              </Col>
              <h1 id="headline">{this.state?.district?.name}</h1>
              <Table bordered hover size="sm" className="tight">
                <thead class="shadow" id="scheduleHeader">
                  <tr>
                    <th>
                      <h1>Student</h1>
                      <br /> <br /> <br />
                    </th>
                    <th>Present</th>
                    <th>Absent</th>
                    {this.state.attendance
                      .filter(
                        (day) =>
                          day.date >= this.state.startDate &&
                          day.date <= this.state.endDate
                      )
                      .sort(function (a, b) {
                        let x = a.id;
                        let y = b.id;
                        if (x < y) {
                          return -1;
                        }
                        if (x > y) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((day) => (
                        <th>{day.date}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {this.state.students
                    .filter(
                      (cstudent) =>
                        cstudent.district?.id === this.state?.district?.id
                    )
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
                    .map((student) => (
                      <tr>
                        <th key={student.id}>
                          {student.firstName} {student.lastName}
                        </th>
                        <th>
                          {this.state.attendance
                            .filter(
                              (day) =>
                                day.date >= this.state.startDate &&
                                day.date <= this.state.endDate
                            )
                            .map(
                              (day) =>
                                day.student.filter(
                                  (stud) => stud.id === student.id
                                ).length
                            )
                            .reduce(reducer, 0)}
                        </th>
                        <th>
                          {this.state.attendance.filter(
                            (day) =>
                              day.date >= this.state.startDate &&
                              day.date <= this.state.endDate
                          ).length -
                            this.state.attendance
                              .filter(
                                (day) =>
                                  day.date >= this.state.startDate &&
                                  day.date <= this.state.endDate
                              )
                              .map(
                                (day) =>
                                  day.student.filter(
                                    (stud) => stud.id === student.id
                                  ).length
                              )
                              .reduce(reducer, 0)}
                        </th>
                        {this.state.attendance
                          .filter(
                            (day) =>
                              day.date >= this.state.startDate &&
                              day.date <= this.state.endDate
                          )
                          .sort(function (a, b) {
                            let x = a.id;
                            let y = b.id;
                            if (x < y) {
                              return -1;
                            }
                            if (x > y) {
                              return 1;
                            }
                            return 0;
                          })
                          .map((day) => (
                            <td
                              className={this.attendanceSwitch(
                                day.student.filter(
                                  (here) => here.id === student.id
                                ).length
                              )}
                            >
                              {this.attendanceSwitch(
                                day.student.filter(
                                  (here) => here.id === student.id
                                ).length
                              )}
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}
