import { Component } from 'react';
import Announcement from "./AnnouncementComponent";
import {Container } from "reactstrap";

class Home extends Component {
    render() {
        return(
            <Container>
            <Announcement></Announcement>
            </Container>
        )
    }
}

export default Home