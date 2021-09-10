import { Component } from "react";
import { Container } from "reactstrap";
import Calendar from "./CalendarComponent";

class Home extends Component {
  render() {
    return (
      <Container>
        <Calendar />
      </Container>
    );
  }
}

export default Home;
