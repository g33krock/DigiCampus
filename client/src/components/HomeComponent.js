import { Component } from "react";
import { Container } from "reactstrap";
import Calendar from "./CalendarComponent";

class Home extends Component {
  render() {
    return (
      <Container>
        {/* <h1><a href='http://steam.great-site.net/halloween/halloween.HTML' style={{color: 'limegreen', textShadow: "2px 2px black", fontFamily: "spooky"}}>Click here for Grant Jefferson's Halloween Spooktacular Activity!</a></h1> */}
        <Calendar />
      </Container>
    );
  }
}

export default Home;
