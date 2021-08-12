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
    };
  }

  componentDidMount() {
    fetcher(`${baseURL}/announcements`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          announcements: data,
          students: [],
          teachers: [],
          teacher: null,
          campus: null,
          userEmail: null,
        });
      });
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
    console.log(this.state.teachers);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    let user;
    if (
      this.state.teacher?.role.id === 1 ||
      this.state.teacher?.role.id === 2
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
            </Nav>
          </Collapse>
          <Col sm={3}></Col>
        </div>
      );
    } else if (
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
              <Col sm={3}></Col>
            </Nav>
          </Collapse>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Jumbo />
        <Navbar dark sticky="top" expand="md">
          {user}
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;
