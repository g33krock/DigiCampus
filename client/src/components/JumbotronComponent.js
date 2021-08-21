import React, { Component } from "react";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
import times from "lodash/times";
import { announcementService } from "../services/announcementService";

export class Jumbo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        announcements: [],
      };
    }
  
    componentDidMount() {
      this.getAnnouncements()
    }
  
    async getAnnouncements() {
      const announcements = await announcementService.all()
        this.setState({
          announcements
        });
    }
  

render(){
    return(

        <div style={{ height: "300px" }} className="megatron">
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
                        // "url('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/flappingowl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZmxhcHBpbmdvd2wuZ2lmIiwiaWF0IjoxNjI5NDk0NzI4LCJleHAiOjE5NDQ4NTQ3Mjh9.l4YhGnu8NaW8SOQBt-SH8v48ob__pckb7Tv3MyOyQ9c')",
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
      
    )
}
}
