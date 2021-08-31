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
import { courseService } from "../services/courseService";
import { teacherService } from "../services/teacherService";
import { scheduleService } from "../services/scheduleService";
import { TeacherPrepUpdater } from "./UpdateTeacherPrepOne";
import DateRangeFilter from "./DateRangeFilter";
import { isNull } from "lodash";

export default class AdminSchedule extends Component {
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
      pOne: [],
      pTwo: [],
      pThree: [],
      pFour: [],
      pFive: [],
      pSix: [],
      pSeven: [],
      pEight: [],
      pNine: [],
      pTen: [],
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

  async getSchedules() {
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
    const teachers = await teacherService.all();
    this.setState({ teachers });
    const pOne = this.state.teachers
      .filter(
        (teacher) => teacher.pOne === "Yes" || teacher.pOne === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pOne });
    const pTwo = this.state.teachers
      .filter(
        (teacher) => teacher.pTwo === "Yes" || teacher.pTwo === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pTwo });
    const pThree = this.state.teachers
      .filter(
        (teacher) =>
          teacher.pThree === "Yes" || teacher.pThree === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pThree });
    const pFour = this.state.teachers
      .filter(
        (teacher) => teacher.pFour === "Yes" || teacher.pFour === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pFour });
    const pFive = this.state.teachers
      .filter(
        (teacher) => teacher.pFive === "Yes" || teacher.pFive === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pFive });
    const pSix = this.state.teachers
      .filter(
        (teacher) => teacher.pSix === "Yes" || teacher.pSix === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pSix });
    const pSeven = this.state.teachers
      .filter(
        (teacher) =>
          teacher.pSeven === "Yes" || teacher.pSeven === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pSeven });
    const pEight = this.state.teachers
      .filter(
        (teacher) =>
          teacher.pEight === "Yes" || teacher.pEight === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pEight });
    const pNine = this.state.teachers
      .filter(
        (teacher) => teacher.pNine === "Yes" || teacher.pNine === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pNine });
    const pTen = this.state.teachers
      .filter(
        (teacher) => teacher.pTen === "Yes" || teacher.pTen === "Para Support"
      )
      .filter((teacher) => teacher.campus.id === this.state?.campus?.id);
    this.setState({ pTen });
    const courses = await courseService.all();
    this.setState({ courses });
  }

  setSchedule(schedule) {
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
    let teachingHours = this.state.schedules
      .filter((schedule) => schedule.campus.id === this.state?.campus?.id)
      .filter(
        (schedule) =>
          schedule.course.subject === "ELA" ||
          schedule.course.subject === "Math" ||
          schedule.oneToOne === "true"
      );
    let paraHours = this.state.schedules
      .filter((schedule) => schedule.campus.id === this.state?.campus?.id)
      .filter(
        (schedule) =>
          schedule?.para?.id !== 26 &&
          schedule?.para?.id !== isNull &&
          schedule?.para?.id >= 1 &&
          schedule.course.id !== 48
      );
    const totalStudentHours = teachingHours.concat(paraHours).length;
    const pOnes = this.state.teachers.filter(
      (teacher) =>
        (teacher.pOne === "Yes" || teacher.pOne === "Para Support") &&
        teacher.pOne !== "No" &&
        teacher.pOne !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    const pTwos = this.state.teachers.filter(
      (teacher) =>
        (teacher.pTwo === "Yes" || teacher.pTwo === "Para Support") &&
        teacher.pTwo !== "No" &&
        teacher.pTwo !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    const pThrees = this.state.teachers.filter(
      (teacher) =>
        (teacher.pThree === "Yes" || teacher.pThree === "Para Support") &&
        teacher.pThree !== "No" &&
        teacher.pThree !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    const pFours = this.state.teachers.filter(
      (teacher) =>
        (teacher.pFour === "Yes" || teacher.pFour === "Para Support") &&
        teacher.pFour !== "No" &&
        teacher.pFour !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    const pFives = this.state.teachers.filter(
      (teacher) =>
        (teacher.pFive === "Yes" || teacher.pFive === "Para Support") &&
        teacher.pFive !== "No" &&
        teacher.pFive !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    const pSixs = this.state.teachers.filter(
      (teacher) =>
        (teacher.pSix === "Yes" || teacher.pSix === "Para Support") &&
        teacher.pSix !== "No" &&
        teacher.pSix !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    const pSevens = this.state.teachers.filter(
      (teacher) =>
        (teacher.pSeven === "Yes" || teacher.pSeven === "Para Support") &&
        teacher.pSeven !== "No" &&
        teacher.pSeven !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    const pEights = this.state.teachers.filter(
      (teacher) =>
        (teacher.pEight === "Yes" || teacher.pEight === "Para Support") &&
        teacher.pEight !== "No" &&
        teacher.pEight !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    const pNines = this.state.teachers.filter(
      (teacher) =>
        (teacher.pNine === "Yes" || teacher.pNine === "Para Support") &&
        teacher.pNine !== "No" &&
        teacher.pNine !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    const pTens = this.state.teachers.filter(
      (teacher) =>
        (teacher.pTen === "Yes" || teacher.pTen === "Para Support") &&
        teacher.pTen !== "No" &&
        teacher.pTen !== "Prep" &&
        teacher.campus.id === this.state?.campus?.id &&
        (teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4)
    ).length;
    let sched1 = this.state.schedules
      .filter((schedule) => schedule.period === 1)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para1 = this.state.schedules
      .filter((schedule) => schedule.period === 1)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total1 = sched1.concat(para1);
    let teach1 = this.state.pOne
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach1 = teach1.filter(function (item) {
      return !total1.includes(item);
    });
    // console.log(teach1);
    let sched2 = this.state.schedules
      .filter((schedule) => schedule.period === 2)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para2 = this.state.schedules
      .filter((schedule) => schedule.period === 2)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total2 = sched2.concat(para2);
    let teach2 = this.state.pTwo
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach2 = teach2.filter(function (item) {
      return !total2.includes(item);
    });
    // console.log(teach2);
    let sched3 = this.state.schedules
      .filter((schedule) => schedule.period === 3)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para3 = this.state.schedules
      .filter((schedule) => schedule.period === 3)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total3 = sched3.concat(para3);
    let teach3 = this.state.pThree
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach3 = teach3.filter(function (item) {
      return !total3.includes(item);
    });
    // console.log(teach3);
    let sched4 = this.state.schedules
      .filter((schedule) => schedule.period === 4)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para4 = this.state.schedules
      .filter((schedule) => schedule.period === 4)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total4 = sched4.concat(para4);
    let teach4 = this.state.pFour
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach4 = teach4.filter(function (item) {
      return !total4.includes(item);
    });
    // console.log(teach4);
    let sched5 = this.state.schedules
      .filter((schedule) => schedule.period === 5)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para5 = this.state.schedules
      .filter((schedule) => schedule.period === 5)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total5 = sched5.concat(para5);
    let teach5 = this.state.pFive
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach5 = teach5.filter(function (item) {
      return !total5.includes(item);
    });
    // console.log(teach5);
    let sched6 = this.state.schedules
      .filter((schedule) => schedule.period === 6)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para6 = this.state.schedules
      .filter((schedule) => schedule.period === 6)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total6 = sched6.concat(para6);
    let teach6 = this.state.pSix
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach6 = teach6.filter(function (item) {
      return !total6.includes(item);
    });
    // console.log(teach6);
    let sched7 = this.state.schedules
      .filter((schedule) => schedule.period === 7)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para7 = this.state.schedules
      .filter((schedule) => schedule.period === 7)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total7 = sched7.concat(para7);
    let teach7 = this.state.pSeven
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach7 = teach7.filter(function (item) {
      return !total7.includes(item);
    });
    // console.log(teach7);
    let sched8 = this.state.schedules
      .filter((schedule) => schedule.period === 8)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para8 = this.state.schedules
      .filter((schedule) => schedule.period === 8)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total8 = sched8.concat(para8);
    let teach8 = this.state.pEight
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach8 = teach8.filter(function (item) {
      return !total8.includes(item);
    });
    // console.log(teach8);
    let sched9 = this.state.schedules
      .filter((schedule) => schedule.period === 9)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para9 = this.state.schedules
      .filter((schedule) => schedule.period === 9)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total9 = sched9.concat(para9);
    let teach9 = this.state.pNine
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach9 = teach9.filter(function (item) {
      return !total9.includes(item);
    });
    // console.log(teach9);
    let sched10 = this.state.schedules
      .filter((schedule) => schedule.period === 10)
      .filter((schedule) => schedule.teacher.id !== 26)
      .map(
        (schedule) =>
          `${schedule.teacher.firstName} ${schedule.teacher.lastName}`
      );
    let para10 = this.state.schedules
      .filter((schedule) => schedule.period === 10)
      .filter((schedule) => schedule.para?.id !== 26)
      .map(
        (schedule) => `${schedule.para?.firstName} ${schedule.para?.lastName}`
      );
    let total10 = sched10.concat(para10);
    let teach10 = this.state.pTen
      .filter((teacher) => teacher.campus.id === this.state.campus?.id)
      .filter(
        (teacher) =>
          teacher.role.id === 2 ||
          teacher.role.id === 3 ||
          teacher.role.id === 7 ||
          teacher.role.id === 4
      )
      .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
    teach10 = teach10.filter(function (item) {
      return !total10.includes(item);
    });
    const totalTeacherHours =
      pOnes +
      pTwos +
      pThrees +
      pFours +
      pFives +
      pSixs +
      pSevens +
      pEights +
      pNines +
      pTens;

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
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Schedule Prep
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "5" })}
              onClick={() => {
                this.toggle("5");
              }}
            >
              Efficiency
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "6" })}
              onClick={() => {
                this.toggle("6");
              }}
            >
              Date filter
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Col sm={3}>
              <Label>Select Campus: </Label>
              <Input type="select" id="selectCampus" onChange={this.onChange}>
                <option></option>
                {this.state.campuses.map((campus) => (
                  <option value={campus.id}>{campus.name}</option>
                ))}
              </Input>
            </Col>
            <h1 id="headline">K-5</h1>
            <Table bordered hover size="sm" className="tight">
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
                  .filter((student) => student.grade <= 5)
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
                            {/* <small>{schedule.period}</small>
                            <br /> */}
                            <small>{schedule.course.name}</small>
                            <br />
                            <small>
                              {schedule.teacher?.firstName}{" "}
                              {schedule.teacher?.lastName}
                            </small>{" "}
                            <br />
                            <small>
                              {schedule.para?.firstName}{" "}
                              {schedule.para?.lastName}
                            </small>{" "}
                            <br />
                            <ScheduleUpdater
                              callback={() => this.getSchedules()}
                              scheduleId={schedule.id}
                              period={schedule.period}
                              campus={schedule.campus}
                              para={schedule?.para}
                              oneToOne={schedule?.oneToOne}
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
            <h1 id="headline">6-12</h1>
            <Table bordered hover size="sm" className="tight">
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
                  .filter((student) => student.grade >= 6)
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
                            {/* <small>{schedule.period}</small>
                            <br /> */}
                            <small>{schedule.course.name}</small>
                            <br />
                            <small>
                              {schedule.teacher?.firstName}{" "}
                              {schedule.teacher?.lastName}
                            </small>{" "}
                            <br />
                            <small>
                              {schedule.para?.firstName}{" "}
                              {schedule.para?.lastName}
                            </small>{" "}
                            <br />
                            <ScheduleUpdater
                              callback={() => this.getSchedules()}
                              scheduleId={schedule.id}
                              period={schedule.period}
                              campus={schedule.campus}
                              para={schedule?.para}
                              oneToOne={schedule?.oneToOne}
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
            <h1 id="headline">K-5</h1>
            <Table bordered hover size="sm" className="tight">
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
                  .filter((student) => student.grade <= 5)
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
                            <br />
                            <small>
                              {schedule.para?.firstName}{" "}
                              {schedule.para?.lastName}
                            </small>{" "}
                            <br />
                            <small>{schedule.teacher?.link} </small>{" "}
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <h1 id="headline">6-12</h1>
            <Table bordered hover size="sm" className="tight">
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
                  .filter((student) => student.grade >= 6)
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
                            <br />
                            <small>
                              {schedule.para?.firstName}{" "}
                              {schedule.para?.lastName}
                            </small>{" "}
                            <br />
                            <small>{schedule.teacher?.link} </small>{" "}
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="3">
            <Col sm={3}>
              <Label>Select Campus: </Label>
              <Input type="select" id="selectCampus" onChange={this.onChange}>
                <option></option>
                {this.state.campuses.map((campus) => (
                  <option value={campus.id}>{campus.name}</option>
                ))}
              </Input>
            </Col>
            <Table bordered hover size="sm" className="tight">
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
                <td>
                  {teach1.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
                <td>
                  {teach2.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
                <td>
                  {teach3.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
                <td>
                  {teach4.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
                <td>
                  {teach5.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
                <td>
                  {teach6.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
                <td>
                  {teach7.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
                <td>
                  {teach8.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
                <td>
                  {teach9.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
                <td>
                  {teach10.map((teacher) => (
                    <p>{teacher}</p>
                  ))}
                </td>
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="4">
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
                    <h2>Teacher</h2>
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
                {this.state.teachers
                  .filter(
                    (cstudent) => cstudent.campus.id === this.state?.campus?.id
                  )
                  .filter(
                    (teacher) =>
                      teacher.role.id === 2 ||
                      teacher.role.id === 3 ||
                      teacher.role.id === 4
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
                  .map((teacher) => (
                    <tr>
                      <th key={teacher.id}>
                        {teacher.firstName} {teacher.lastName}
                        <TeacherPrepUpdater
                          callback={() => this.getSchedules()}
                          teacherID={teacher.id}
                          teacherP1={teacher.pOne}
                          teacherP2={teacher.pTwo}
                          teacherP3={teacher.pThree}
                          teacherP4={teacher.pFour}
                          teacherP5={teacher.pFive}
                          teacherP6={teacher.pSix}
                          teacherP7={teacher.pSeven}
                          teacherP8={teacher.pEight}
                          teacherP9={teacher.pNine}
                          teacherP10={teacher.pTen}
                        ></TeacherPrepUpdater>
                      </th>
                      <td className={teacher.pOne}>1 {teacher.pOne}</td>
                      <td className={teacher.pTwo}>2 {teacher.pTwo}</td>
                      <td className={teacher.pThree}>3 {teacher.pThree}</td>
                      <td className={teacher.pFour}>4 {teacher.pFour}</td>
                      <td className={teacher.pFive}>5 {teacher.pFive}</td>
                      <td className={teacher.pSix}>6 {teacher.pSix}</td>
                      <td className={teacher.pSeven}>7 {teacher.pSeven}</td>
                      <td className={teacher.pEight}>8 {teacher.pEight}</td>
                      <td className={teacher.pNine}>9 {teacher.pNine}</td>
                      <td className={teacher.pTen}>10 {teacher.pTen}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="5">
            Efficiency
            <Col sm={3}>
              <Label>Select Campus: </Label>
              <Input type="select" id="selectCampus" onChange={this.onChange}>
                <option></option>
                {this.state.campuses.map((campus) => (
                  <option value={campus.id}>{campus.name}</option>
                ))}
              </Input>
            </Col>
            <Table>
              <thead>
                <tr>
                  <th>
                    <h2>Student</h2>
                  </th>
                  <th>
                    <h2>Teacher</h2>
                  </th>
                  <th>
                    <h2>Ratio</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{totalStudentHours}</th>
                  <th>{totalTeacherHours}</th>
                  <th>{totalTeacherHours / totalStudentHours}</th>
                </tr>
              </tbody>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th>
                    <h2>Student</h2>
                  </th>
                  <th>
                    <h2>Teacher</h2>
                  </th>
                  <th>
                    <h2>Para</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.students
                  .filter(
                    (student) => student.campuses.id === this.state?.campus?.id
                  )
                  .sort(function (a, b) {
                    let x = a.lastName.toLowerCase();
                    let y = b.lastName.toLowerCase();
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
                        {student.lastName}, {student.firstName}
                      </th>
                      <th>
                        {
                          student.schedules.filter(
                            (schedule) =>
                              schedule.course.subject === "ELA" ||
                              schedule.course.subject === "Math" ||
                              schedule.oneToOne === "true"
                          ).length
                        }
                      </th>
                      <th>
                        {
                          student.schedules.filter(
                            (schedule) =>
                              schedule?.para?.id !== 26 &&
                              schedule?.para?.id !== isNull &&
                              schedule?.para?.id >= 1
                            // schedule.course.id !== 48
                          ).length
                        }
                      </th>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="6">
            <DateRangeFilter></DateRangeFilter>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
