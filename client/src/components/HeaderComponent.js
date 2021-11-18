import React, { Component } from "react";
import { baseURL } from "../baseURL";
import { teacherService } from "../services/teacherService";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Col,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { fetcher } from "../services/fetcher";
import { Jumbo } from "./JumbotronComponent";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
      announcements: [],
      currentTime: "",
      alarmTime1: "07:50:00",
      alarmTime2: "07:55:00",
      alarmTime3: "08:40:00",
      alarmTime4: "08:45:00",
      alarmTime5: "09:30:00",
      alarmTime6: "09:35:00",
      alarmTime7: "10:20:00",
      alarmTime8: "10:25:00",
      alarmTime9: "11:10:00",
      alarmTime10: "11:15:00",
      alarmTime11: "12:00:00",
      alarmTime12: "12:05:00",
      alarmTime13: "12:50:00",
      alarmTime14: "12:55:00",
      alarmTime15: "13:40:00",
      alarmTime16: "13:45:00",
      alarmTime17: "14:30:00",
      alarmTime18: "14:35:00",
      alarmTime19: "15:20:00",
      alarmTime20: "15:25:00",
      alarmTime21: "16:10:00",
    };
  }

  async componentDidMount() {
    const teachers = await teacherService.all();
    console.log(teachers);
    const teacher = teachers.find(
      (teacher) => teacher.email === this.props.userEmail
    );
    console.log(teacher);

    this.setState({
      teachers: teachers,
      teacher: teacher,
      campus: teacher.campus,
    });
    console.log(this.state.teacher);
    this.getAnnouncements();
    this.clock = setInterval(() => this.setCurrentTime(), 1000);
    this.interval = setInterval(() => this.checkAlarmClock(), 1000);
  }

  getAnnouncements() {
    fetcher(`${baseURL}/announcements`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          announcements: data,
        });
      });
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  componentWillUnmount() {
    clearInterval(this.clock);
    clearInterval(this.interval);
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString("en-US", { hour12: false }),
    });
  }

  checkAlarmClock() {
    if (
      this.state.teacher?.id === 40 &&
      (this.state.currentTime === this.state.alarmTime1 ||
        this.state.currentTime === this.state.alarmTime2 ||
        this.state.currentTime === this.state.alarmTime3 ||
        this.state.currentTime === this.state.alarmTime4 ||
        this.state.currentTime === this.state.alarmTime5 ||
        this.state.currentTime === this.state.alarmTime6 ||
        this.state.currentTime === this.state.alarmTime7 ||
        this.state.currentTime === this.state.alarmTime8 ||
        this.state.currentTime === this.state.alarmTime9 ||
        this.state.currentTime === this.state.alarmTime10 ||
        this.state.currentTime === this.state.alarmTime11 ||
        this.state.currentTime === this.state.alarmTime12 ||
        this.state.currentTime === this.state.alarmTime13 ||
        this.state.currentTime === this.state.alarmTime14 ||
        this.state.currentTime === this.state.alarmTime15 ||
        this.state.currentTime === this.state.alarmTime16 ||
        this.state.currentTime === this.state.alarmTime17 ||
        this.state.currentTime === this.state.alarmTime18 ||
        this.state.currentTime === this.state.alarmTime19 ||
        this.state.currentTime === this.state.alarmTime20 ||
        this.state.currentTime === this.state.alarmTime20)
    ) {
      var a = new Audio(
        "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/darkside.mp3"
      );
      a.play();
      console.log("alarm");
    } else if (
      this.state.currentTime === this.state.alarmTime1 ||
      this.state.currentTime === this.state.alarmTime2 ||
      this.state.currentTime === this.state.alarmTime3 ||
      this.state.currentTime === this.state.alarmTime4 ||
      this.state.currentTime === this.state.alarmTime5 ||
      this.state.currentTime === this.state.alarmTime6 ||
      this.state.currentTime === this.state.alarmTime7 ||
      this.state.currentTime === this.state.alarmTime8 ||
      this.state.currentTime === this.state.alarmTime9 ||
      this.state.currentTime === this.state.alarmTime10 ||
      this.state.currentTime === this.state.alarmTime11 ||
      this.state.currentTime === this.state.alarmTime12 ||
      this.state.currentTime === this.state.alarmTime13 ||
      this.state.currentTime === this.state.alarmTime14 ||
      this.state.currentTime === this.state.alarmTime15 ||
      this.state.currentTime === this.state.alarmTime16 ||
      this.state.currentTime === this.state.alarmTime17 ||
      this.state.currentTime === this.state.alarmTime18 ||
      this.state.currentTime === this.state.alarmTime19 ||
      this.state.currentTime === this.state.alarmTime20 ||
      this.state.currentTime === this.state.alarmTime20
    ) {
      var a = new Audio(
        "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/Owl Coo - QuickSounds.com.mp3"
        // "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/doublemint.mp3"
      );
      a.play();
      console.log("alarm");
    }
  }

  // checkAlarmClock() {
  //   if (
  //     this.state.currentTime === this.state.alarmTime1
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/happyTrails.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   } else if (
  //     this.state.currentTime === this.state.alarmTime3
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/fireAndRain.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   } else if (
  //     this.state.currentTime === this.state.alarmTime5
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/dontYouForgetAboutMe.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   } else if (
  //     this.state.currentTime === this.state.alarmTime7
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/soLongFarewell.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   } else if (
  //     this.state.currentTime === this.state.alarmTime9
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/timeOfMyLife.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   } else if (
  //     this.state.currentTime === this.state.alarmTime11
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/goodRiddance.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   } else if (
  //     this.state.currentTime === this.state.alarmTime13
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/dontWannaCloseMyEyes.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   } else if (
  //     this.state.currentTime === this.state.alarmTime15
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/dontYouForgetAboutMe.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   } else if (
  //     this.state.currentTime === this.state.alarmTime17
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/iWillRememberYou.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   } else if (
  //     this.state.currentTime === this.state.alarmTime19
  //   ) {
  //     var a = new Audio(
  //       "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/byebyebye.mp3"
  //     );
  //     a.play();
  //     console.log("alarm");
  //   }
  // }

  render() {
    let user;
    if (
      this.state.teacher?.role.id === 1 ||
      this.state.teacher?.role.id === 2 ||
      this.state.teacher?.role.id === 11
    ) {
      user = (
        <div className="container">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Aspire-Owl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXNwaXJlLU93bC5naWYiLCJpYXQiOjE2Mjg2MjAzMTAsImV4cCI6MTk0Mzk4MDMxMH0.K6zKYMhaQEiYPgsFOVq-EnadF8KeZAg51Ape30-Q9NA"
              height="50"
              width="50"
              alt="Aspire Owl"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/teachers">
                  Teachers
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/students">
                  Students
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/schedules">
                  Schedule
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/sped">
                  Sped
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/transcripts">
                  Transcript
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/resources">
                  Resources
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/timeCard">
                  TimeCard
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Col sm={3}></Col>
        </div>
      );
    } else if (
      this.state.teacher?.role.id === 3 ||
      this.state.teacher?.role.id === 4
    ) {
      user = (
        <div className="container">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Aspire-Owl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXNwaXJlLU93bC5naWYiLCJpYXQiOjE2Mjg2MjAzMTAsImV4cCI6MTk0Mzk4MDMxMH0.K6zKYMhaQEiYPgsFOVq-EnadF8KeZAg51Ape30-Q9NA"
              height="50"
              width="50"
              alt="Aspire Owl"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/singleteachers">
                  Schedule
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/substitute">
                  Substitute
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/resources">
                  Resources
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Col sm={3}></Col>
        </div>
      );
    } else if (
      this.state.teacher?.role.id === 8
    ) {
      user = (
        <div className="container">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Aspire-Owl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXNwaXJlLU93bC5naWYiLCJpYXQiOjE2Mjg2MjAzMTAsImV4cCI6MTk0Mzk4MDMxMH0.K6zKYMhaQEiYPgsFOVq-EnadF8KeZAg51Ape30-Q9NA"
              height="50"
              width="50"
              alt="Aspire Owl"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/providerTimeCardViewer">
                  Students
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Col sm={3}></Col>
        </div>
      );
    } else if (
      this.state.teacher?.role.id === 12
    ) {
      user = (
        <div className="container">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Aspire-Owl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXNwaXJlLU93bC5naWYiLCJpYXQiOjE2Mjg2MjAzMTAsImV4cCI6MTk0Mzk4MDMxMH0.K6zKYMhaQEiYPgsFOVq-EnadF8KeZAg51Ape30-Q9NA"
              height="50"
              width="50"
              alt="Aspire Owl"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/adminProviderTimeCardViewer">
                  Students
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Col sm={3}></Col>
        </div>
      );
    }else if (
      this.state.teacher?.role.id === 5 ||
      this.state.teacher?.role.id === 7
    ) {
      user = (
        <div className="container">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Aspire-Owl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXNwaXJlLU93bC5naWYiLCJpYXQiOjE2Mjg2MjAzMTAsImV4cCI6MTk0Mzk4MDMxMH0.K6zKYMhaQEiYPgsFOVq-EnadF8KeZAg51Ape30-Q9NA"
              height="50"
              width="50"
              alt="Aspire Owl"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/adminTeachers">
                  Teachers
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/adminStudents">
                  Students
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/adminSchedules">
                  Schedule
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/sped">
                  Sped
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/transcripts">
                  Transcript
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/resources">
                  Resources
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/announcements">
                  Announcement
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/timeCard">
                  TimeCard
                </NavLink>
              </NavItem>
              <Col sm={3}></Col>
            </Nav>
          </Collapse>
        </div>
      );
    } else if (
      this.state.teacher?.role.id === 10
    ) {
      user = (
        <div className="container">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Aspire-Owl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXNwaXJlLU93bC5naWYiLCJpYXQiOjE2Mjg2MjAzMTAsImV4cCI6MTk0Mzk4MDMxMH0.K6zKYMhaQEiYPgsFOVq-EnadF8KeZAg51Ape30-Q9NA"
              height="50"
              width="50"
              alt="Aspire Owl"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/adminTeachers">
                  Teachers
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/adminStudents">
                  Students
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/adminSchedules">
                  Schedule
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/sped">
                  Sped
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/transcripts">
                  Transcript
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/resources">
                  Resources
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/announcements">
                  Announcement
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/timeCard">
                  TimeCard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/billing">
                  Billing
                </NavLink>
              </NavItem>
              <Col sm={3}></Col>
            </Nav>
          </Collapse>
        </div>
      );
    } else if (this.state.teacher?.role.id === 9) {
      user = (
        <div className="container">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Aspire-Owl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXNwaXJlLU93bC5naWYiLCJpYXQiOjE2Mjg2MjAzMTAsImV4cCI6MTk0Mzk4MDMxMH0.K6zKYMhaQEiYPgsFOVq-EnadF8KeZAg51Ape30-Q9NA"
              height="50"
              width="50"
              alt="Aspire Owl"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/timeCard">
                  TimeCard
                </NavLink>
              </NavItem>
              <Col sm={3}></Col>
            </Nav>
          </Collapse>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Jumbo
        teacher={this.state.teacher} />
        <Navbar dark sticky="top" expand="md">
          {user}
        </Navbar>
        <p>{this.state.currentTime}.</p>
        <>{this.checkAlarmClock()}</>
      </React.Fragment>
    );
  }
}

export default Header;
