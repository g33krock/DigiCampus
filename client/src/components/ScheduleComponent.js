import React, { Component } from "react";
import { baseURL } from "../baseURL";
import {
  Table,
  Col,
  Input,
  Label,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { ScheduleUpdater } from "./UpdateSchedule";
// import { DeleteSchedule } from "./DeleteSchedule";
import { fetcher } from "../services/fetcher";
import classnames from "classnames";
import { campusService } from "../services/campusService";
import { scheduleService } from "../services/scheduleService";

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      schedules: [],
      schedule: null,
      students: [],
      student: null,
      isNavOpen: false,
      campuses: [],
      campus: null,
      courses: [],
      teachers: [],
      activeTab: "1",
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount() {
    this.getSchedules();
    console.log(this.props.campus);
    campusService.all().then((campuses) => {
      this.setState({
        campuses,
      });
      console.log(this.state.campuses);
    });
    scheduleService.all().then((schedules) => {
      this.setState({
        schedules,
      });
      console.log(this.state.schedules);
    });
  }

  getSchedules() {
    fetcher(`${baseURL}/students`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((students) => {
        students
          .sort((studenta, studentb) => studenta.lastName - studentb.lastName)
          .filter((cstudent) => cstudent.campuses.id === this.state?.campus?.id)
          .forEach((student) =>
            student.schedules.sort(
              (schedulea, scheduleb) => schedulea.period - scheduleb.period
            )
          );
        this.setState({
          students,
        });
      });
    fetcher(`${baseURL}/teachers`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((data) => {
        // Create relationship between students state array and JSON object
        this.setState({
          teachers: data,
        });
      });
    fetcher(`${baseURL}/courses`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((data) => {
        // Create relationship between students state array and JSON object
        this.setState({
          courses: data,
        });
      });
  }

  setSchedule(schedule) {
    // sets student property to student object.  This looks funny because they both are named student
    this.setState({ schedule: schedule });
    console.log(schedule);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  onChange = (e) => {
    const campusId = Number(e.target.value);
    const campus = this.state.campuses.find((campus) => campus.id === campusId);
    this.setState({ campus });
    console.log(campus);
    console.log(e.target.value);
    this.getSchedules();
  };

  releaseKraken() {
    ScheduleUpdater.toggle();
  }

  render() {
    
      let sched1 = this.state.schedules
        .filter((schedule) => (schedule.period === 1))
        .filter((schedule) => schedule.teacher.id !== 26)
        .map((schedule) => schedule.teacher.firstName);
      let teach1 = this.state.teachers
        .filter((teacher) => teacher.campus.id === this.props.campus?.id)
        .map((teacher) => teacher.firstName);
      teach1 = teach1.filter(function (item) {
        return !sched1.includes(item);
      });
      console.log(teach1);
      let sched2 = this.state.schedules
      .filter((schedule) => (schedule.period === 2))
      .filter((schedule) => schedule.teacher.id !== 26)
      .map((schedule) => schedule.teacher.firstName);
    let teach2 = this.state.teachers
      .filter((teacher) => teacher.campus.id === this.props.campus?.id)
      .map((teacher) => teacher.firstName);
    teach2 = teach2.filter(function (item) {
      return !sched2.includes(item);
    });
    console.log(teach2);
    let sched3 = this.state.schedules
    .filter((schedule) => (schedule.period === 3))
    .filter((schedule) => schedule.teacher.id !== 26)
    .map((schedule) => schedule.teacher.firstName);
  let teach3 = this.state.teachers
    .filter((teacher) => teacher.campus.id === this.props.campus?.id)
    .map((teacher) => teacher.firstName);
  teach3 = teach3.filter(function (item) {
    return !sched3.includes(item);
  });
  console.log(teach3);
  let sched4 = this.state.schedules
  .filter((schedule) => (schedule.period === 4))
  .filter((schedule) => schedule.teacher.id !== 26)
  .map((schedule) => schedule.teacher.firstName);
let teach4 = this.state.teachers
  .filter((teacher) => teacher.campus.id === this.props.campus?.id)
  .map((teacher) => teacher.firstName);
teach4 = teach4.filter(function (item) {
  return !sched4.includes(item);
});
console.log(teach4);
let sched5 = this.state.schedules
.filter((schedule) => (schedule.period === 5))
.filter((schedule) => schedule.teacher.id !== 26)
.map((schedule) => schedule.teacher.firstName);
let teach5 = this.state.teachers
.filter((teacher) => teacher.campus.id === this.props.campus?.id)
.map((teacher) => teacher.firstName);
teach5 = teach5.filter(function (item) {
return !sched5.includes(item);
});
console.log(teach5);
let sched6 = this.state.schedules
.filter((schedule) => (schedule.period === 6))
.filter((schedule) => schedule.teacher.id !== 26)
.map((schedule) => schedule.teacher.firstName);
let teach6 = this.state.teachers
.filter((teacher) => teacher.campus.id === this.props.campus?.id)
.map((teacher) => teacher.firstName);
teach6 = teach6.filter(function (item) {
return !sched6.includes(item);
});
console.log(teach6);
let sched7 = this.state.schedules
.filter((schedule) => (schedule.period === 7))
.filter((schedule) => schedule.teacher.id !== 26)
.map((schedule) => schedule.teacher.firstName);
let teach7 = this.state.teachers
.filter((teacher) => teacher.campus.id === this.props.campus?.id)
.map((teacher) => teacher.firstName);
teach7 = teach7.filter(function (item) {
return !sched7.includes(item);
});
console.log(teach7);
let sched8 = this.state.schedules
.filter((schedule) => (schedule.period === 8))
.filter((schedule) => schedule.teacher.id !== 26)
.map((schedule) => schedule.teacher.firstName);
let teach8 = this.state.teachers
.filter((teacher) => teacher.campus.id === this.props.campus?.id)
.map((teacher) => teacher.firstName);
teach8 = teach8.filter(function (item) {
return !sched8.includes(item);
});
console.log(teach8);
let sched9 = this.state.schedules
.filter((schedule) => (schedule.period === 9))
.filter((schedule) => schedule.teacher.id !== 26)
.map((schedule) => schedule.teacher.firstName);
let teach9 = this.state.teachers
.filter((teacher) => teacher.campus.id === this.props.campus?.id)
.map((teacher) => teacher.firstName);
teach9 = teach9.filter(function (item) {
return !sched9.includes(item);
});
console.log(teach9);
let sched10 = this.state.schedules
.filter((schedule) => (schedule.period === 10))
.filter((schedule) => schedule.teacher.id !== 26)
.map((schedule) => schedule.teacher.firstName);
let teach10 = this.state.teachers
.filter((teacher) => teacher.campus.id === this.props.campus?.id)
.map((teacher) => teacher.firstName);
teach10 = teach10.filter(function (item) {
return !sched10.includes(item);
});
console.log(teach10);
    

    return (
      <div class="tableFixHead">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              My Campus
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              All Campuses
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Free Teachers
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Col>
              <Label>Home Campus: {this.props.campus?.name}</Label>
            </Col>
            <Table bordered hover size="sm">
              <thead class="shadow">
                <tr id="scheduleHeader">
                  <th>
                    <h2>Student</h2>
                    <br /> <br />
                  </th>
                  <th>
                    <br />
                    <br />
                    <br />
                    <h2>Period 1</h2>
                    <p>7:50-8:40</p>
                  </th>
                  <th>
                    <h3>Period 2</h3>
                    <p>8:40-9:30</p>
                  </th>
                  <th>
                    <h3>Period 3</h3>
                    <p>9:30-10:20</p>
                  </th>
                  <th>
                    <h3>Period 4</h3>
                    <p>10:20-11:10</p>
                  </th>
                  <th>
                    <h3>Period 5</h3>
                    <p>11:10-12:00</p>
                  </th>
                  <th>
                    <h3>Period 6</h3>
                    <p>12:00-12:50</p>
                  </th>
                  <th>
                    <h3>Period 7</h3>
                    <p>12:50-1:40</p>
                  </th>
                  <th>
                    <h3>Period 8</h3>
                    <p>1:40-2:30</p>
                  </th>
                  <th>
                    <h3>Period 9</h3>
                    <p>2:30-3:20</p>
                  </th>
                  <th>
                    <h3>Period 10</h3>
                    <p>3:20-4:10</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.students
                  .filter(
                    (cstudent) =>
                      cstudent.campuses.id === this.props?.campus?.id
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
                      {student.schedules
                        .sort((a, b) => a.period - b.period)
                        .map((schedule) => (
                          <td
                            className={schedule.teacher?.firstName}
                            id="schedItem"
                          >
                            <small>{schedule.period}</small>
                            <br />
                            <small>{schedule.course.name}</small>
                            <br />
                            <small>
                              {schedule.teacher?.firstName}{" "}
                              {schedule.teacher?.lastName}
                            </small>{" "}
                            <br />
                            <ScheduleUpdater
                              callback={() => this.getSchedules()}
                              scheduleId={schedule.id}
                              period={schedule.period}
                              campus={schedule.campus}
                              teacher={schedule.teacher}
                              course={schedule.course}
                              courses={this.state.courses}
                              teachers={this.state.teachers}
                            ></ScheduleUpdater>
                            {/* <DeleteSchedule
                              callback={() => this.getSchedules()}
                              scheduleId={schedule.id}
                              period={schedule.period}>
                            </DeleteSchedule> */}
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="2">
            <Col sm={3}>
              <Label>Select Campus: </Label>
              <Input type="select" id="selectCampus" onChange={this.onChange}>
                <option></option>
                {this.state.campuses.map((campus) => (
                  <option value={campus.id}>{campus.name}</option>
                ))}
              </Input>
            </Col>
            <Table bordered hover size="sm">
              <thead class="shadow">
                <tr id="scheduleHeader">
                  <th>
                    <h2>Student</h2>
                    <br /> <br />
                  </th>
                  <th>
                    <br />
                    <br />
                    <br />
                    <h2>Period 1</h2>
                    <p>7:50-8:40</p>
                  </th>
                  <th>
                    <h3>Period 2</h3>
                    <p>8:40-9:30</p>
                  </th>
                  <th>
                    <h3>Period 3</h3>
                    <p>9:30-10:20</p>
                  </th>
                  <th>
                    <h3>Period 4</h3>
                    <p>10:20-11:10</p>
                  </th>
                  <th>
                    <h3>Period 5</h3>
                    <p>11:10-12:00</p>
                  </th>
                  <th>
                    <h3>Period 6</h3>
                    <p>12:00-12:50</p>
                  </th>
                  <th>
                    <h3>Period 7</h3>
                    <p>12:50-1:40</p>
                  </th>
                  <th>
                    <h3>Period 8</h3>
                    <p>1:40-2:30</p>
                  </th>
                  <th>
                    <h3>Period 9</h3>
                    <p>2:30-3:20</p>
                  </th>
                  <th>
                    <h3>Period 10</h3>
                    <p>3:20-4:10</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.students
                  .filter(
                    (cstudent) =>
                      cstudent.campuses.id === this.state?.campus?.id
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
                      {student.schedules
                        .sort((a, b) => a.period - b.period)
                        .map((schedule) => (
                          <td
                            className={schedule.teacher?.firstName}
                            id="schedItem"
                          >
                            <small>{schedule.course.name}</small>
                            <br />
                            <small>
                              {schedule.teacher?.firstName}{" "}
                              {schedule.teacher?.lastName}
                            </small>{" "}
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="3">
            <Col sm={3}>
              <Label>Home Campus: {this.props.campus?.name}</Label>
            </Col>
            <Table bordered hover size="sm">
              <thead class="shadow">
                <tr id="scheduleHeader">
                  <th>
                    <h2>Student</h2>
                    <br /> <br />
                  </th>
                  <th>
                    <br />
                    <br />
                    <br />
                    <h2>Period 1</h2>
                    <p>7:50-8:40</p>
                  </th>
                  <th>
                    <h3>Period 2</h3>
                    <p>8:40-9:30</p>
                  </th>
                  <th>
                    <h3>Period 3</h3>
                    <p>9:30-10:20</p>
                  </th>
                  <th>
                    <h3>Period 4</h3>
                    <p>10:20-11:10</p>
                  </th>
                  <th>
                    <h3>Period 5</h3>
                    <p>11:10-12:00</p>
                  </th>
                  <th>
                    <h3>Period 6</h3>
                    <p>12:00-12:50</p>
                  </th>
                  <th>
                    <h3>Period 7</h3>
                    <p>12:50-1:40</p>
                  </th>
                  <th>
                    <h3>Period 8</h3>
                    <p>1:40-2:30</p>
                  </th>
                  <th>
                    <h3>Period 9</h3>
                    <p>2:30-3:20</p>
                  </th>
                  <th>
                    <h3>Period 10</h3>
                    <p>3:20-4:10</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <td></td>
                <td>{teach1.map(teacher => <p>{teacher}</p>)}</td>
                <td>{teach2.map(teacher => <p>{teacher}</p>)}</td>
                <td>{teach3.map(teacher => <p>{teacher}</p>)}</td>
                <td>{teach4.map(teacher => <p>{teacher}</p>)}</td>
                <td>{teach5.map(teacher => <p>{teacher}</p>)}</td>
                <td>{teach6.map(teacher => <p>{teacher}</p>)}</td>
                <td>{teach7.map(teacher => <p>{teacher}</p>)}</td>
                <td>{teach8.map(teacher => <p>{teacher}</p>)}</td>
                <td>{teach9.map(teacher => <p>{teacher}</p>)}</td>
                <td>{teach10.map(teacher => <p>{teacher}</p>)}</td>
              </tbody>
            </Table>
          </TabPane>
        </TabContent>
        
      </div>
    );
  }
}
