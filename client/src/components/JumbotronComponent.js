import React, { Component } from "react";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
import times from "lodash/times";
import { baseURL } from "../baseURL";
import {
  Jumbotron
} from "reactstrap";
import { fetcher } from "../services/fetcher";

export class Jumbo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        announcements: [],
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
render(){
    return(
        <Jumbotron fluid>
        <div style={{ height: "400px" }}>
          <Marquee
            velocity={12}
            minScale={0.7}
            resetAfterTries={200}
            scatterRandomly
          >
            {times(7, Number).map((id) => (
              <Motion
                key={`child-${id}`}
                className="motion"
                initDeg={randomIntFromInterval(0, 360)}
                direction={
                  Math.random() > 0.5 ? "clockwise" : "counterclockwise"
                }
                velocity={10}
                radius={50}
              >
                <div
                  style={{
                    minWidth: "300px",
                    backgroundImage:
                      "url('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Bubble.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQnViYmxlLnBuZyIsImlhdCI6MTYyODY0MzczMywiZXhwIjoxOTQ0MDAzNzMzfQ.dI8BFOJk-032ydJfO5SiJdNOr-KPj7NILzu_Y5KVIS4')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    textAlign: "center",
                    lineHeight: "20px",
                  }}
                >
                  {this.state.announcements
                    .filter((announcement) => announcement.id === id)
                    .map((announcement) => (
                      <div>
                        <h3>{announcement.head}</h3>
                        <p>{announcement.body}</p>
                      </div>
                    ))}
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
    )
}
}
