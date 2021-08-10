import React, { Component } from 'react';
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
import times from "lodash/times";
import { baseURL } from "../baseURL";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { fetcher } from '../services/fetcher';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
            announcements:[]
        };
    }

    componentDidMount() {
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
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <Jumbotron fluid>
                <div style={{ height: "400px" }}>
                <Marquee velocity={12} minScale={0.7} resetAfterTries={200} scatterRandomly>
                    {times(5, Number).map((id) => (
                    <Motion
                        key={`child-${id}`}
                        className="motion"
                        initDeg={randomIntFromInterval(0, 360)}
                        direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
                        velocity={10}
                        radius={50}
                    >
                        <div
                        style={{
                            width: "150px",
                            height: "auto",
                            borderRadius: "100%",
                            backgroundColor: "lightblue",
                            textAlign: "center",
                            lineHeight: "20px",
                        }}
                        >
                        {this.state.announcements.filter((announcement) => announcement.id === id).map(announcement => <div><h3>{announcement.head}</h3><p>{announcement.body}</p></div>)}
                        </div>
                    </Motion>
                    ))}
                </Marquee>
                </div>
                    {/* <div className="container" id="app">
                        <div className="row" id="wrapper">
                            <div className="col">
                                <h1 class="lead">CyberCampus</h1>
                                <h2 class="lead">Let the robots do the work for you!</h2>
                            </div>
                        </div>
                    </div> */}
                </Jumbotron>
                <Navbar dark sticky="top" expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"><img src='https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Aspire-Owl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXNwaXJlLU93bC5naWYiLCJpYXQiOjE2Mjg2MjAzMTAsImV4cCI6MTk0Mzk4MDMxMH0.K6zKYMhaQEiYPgsFOVq-EnadF8KeZAg51Ape30-Q9NA' height="50" width="50" alt="Aspire Owl"/></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/calendar">Calendar</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/teachers">Teachers</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/substitute">Substitute</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/singleteachers">Teacher</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/students">Students</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/schedules">Schedule</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/sped">Sped</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/transcripts">Transcript</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <Col sm={3}>
                        </Col>
                    </div>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default Header