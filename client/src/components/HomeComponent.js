import { Component } from "react";
import { Container } from "reactstrap";
import Calendar from "./CalendarComponent";

class Home extends Component {
  render() {
    return (
      <Container>
        {/* <h1><a href='http://steam.great-site.net/halloween/halloween.HTML' style={{color: 'limegreen', textShadow: "2px 2px black", fontFamily: "spooky"}}>Click here for Grant Jefferson's Halloween Spooktacular Activity!</a></h1> */}
        <Calendar />
        {/* <div class="calendly-inline-widget" dangerouslySetInnerHTML={{ __html: '<iframe src="https://calendly.com/dallas-lovell/test" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'}} />
        <script type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"></script> */}
      </Container>
    );
  }
}

export default Home;
