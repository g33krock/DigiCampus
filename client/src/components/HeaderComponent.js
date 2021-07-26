import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
        };
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
                    <div className="container" id="app">
                        <div className="row" id="wrapper">
                            <div className="col">
                                <h1>CyberCampus</h1>
                                {/* <h1 className="glitch" id="perfectdark" data-text="CyberCampus">CyberCampus</h1> */}
                                <h2>Let the robots do the work for you!</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"><img src='https://qyctrtcwtwasdktftmuy.supabase.co/storage/v1/object/sign/images/Apple.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQXBwbGUucG5nIiwiaWF0IjoxNjIzMDkyOTc0LCJleHAiOjE5Mzg0NTI5NzR9.kI-zXjC828rQxRlF0dGG0zSP1fHGFN_qaY-8h7yPSLE' height="50" width="50" alt="Pirate Ship"/></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">Home</NavLink>
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