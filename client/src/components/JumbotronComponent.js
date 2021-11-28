import React, { Component } from "react";
import { Col, Row } from "reactstrap";
// import Marquee from "react-marquee-slider";
import styled from "styled-components";
// import times from "lodash/times";
import { announcementService } from "../services/announcementService";

export class Jumbo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
    };
  }

  componentDidMount() {
    this.getAnnouncements();
  }

  async getAnnouncements() {
    const announcements = await announcementService.all();
    this.setState({
      announcements,
    });
  }

  textSwitch(randomInt) {
    switch (randomInt) {
      case 0:
        return "1958";
      case 1:
        return "1965";
      case 2:
        return "1972";
      case 3:
        return "1980";
      case 4:
        return "1985";
      case 5:
        return "1992";
      case 6:
        return "1999";
      case 7:
        return "2000";
      case 8:
        return "2005";
      default:
        return "5 A.D.";
    }
  }

  render() {
    const Height = styled.div`
      position: relative;
      width: 100%;
      height: ${(props) => (props.height ? props.height + "px" : "auto")};
    `;

    const Box = styled.div`
      padding: ${(props) => props.scale * 25}px;
    `;

    const Review = styled.div`
      width: ${(props) => props.scale * 350}px;
      display: flex;
      padding: ${(props) => props.scale * 25}px;
      border-radius: 4px;
    `;

    const Content = styled.div`
      p {
        margin: 0;
        color: #444;
        font-family: Helvetica, sans-serif;
        font-size: ${(props) => props.scale * 14}px;
        line-height: ${(props) => props.scale * 20}px;
        font-weight: 100;
        text-align: left;
      }
    `;


    const FullWidth = styled.div`
      width: 100vw;
      position: relative;
      left: 25%;
      right: 25%;
      margin-left: -25vw;
      margin-right: -25vw;
    `;

    const getRandomInt = () => {
      return Math.floor(Math.random() * 9);
    };
    if(this.props.teacher?.id === 40) {
    return (
      <FullWidth className="birthday">
        <Height height={300}>
          <h1 style={{textAlign:"center", position: "relative", top: "25%", fontSize:"500%", color: "yellow", fontFamily:"jedi", textShadow:"2px 2px black"}}>Happy Birthday!</h1>
        </Height>
      </FullWidth>
    )} else {
      return (
        <FullWidth className="megatron">
          <Height height={300} style={{alignContent:"center"}}>
            <Row>
              <Col />
              <Col>
          <img src="https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/AspireWinter.gif" style={{height:"300px", position:"absolute", alignContent:"center"}}/>
          </Col>
          <Col />
          </Row>
            {/* <h1 style={{textAlign:"center", position: "relative", top: "25%", fontSize:"500%", color: "yellow", fontFamily:"jedi", textShadow:"2px 2px black"}}>Happy Birthday!</h1> */}
            {/* <strong style={{textAlign:"center", color:"gold", position: "absolute", bottom: "15%", left: "46%"}}>Class of {this.textSwitch(getRandomInt())}</strong> */}
            {/* <Marquee
              velocity={12}
              minScale={0.7}
              resetAfterTries={200}
              scatterRandomly
            >
              {times(2, Number).map((id) => (
                <Box key={`child-${id}`} scale={this.scale}>
                  <Review scale={this.scale}>
                    <Content scale={this.scale}>
                      {this.state.announcements
                        .filter((announcement) => announcement.id === id)
                        .map((announcement) => (
                          <div>
                            <strong>{announcement.head}</strong>
                            <small>{announcement.body}</small>
                          </div>
                        ))}
                    </Content>
                  </Review>
                </Box>
                // <Motion
                //   key={`child-${id}`}
                //   className="motion"
                //   initDeg={randomIntFromInterval(0, 360)}
                //   direction={
                //     Math.random() > 0.5 ? "clockwise" : "counterclockwise"
                //   }
                //   velocity={10}
                //   radius={50}
                // >
                //   <div
                //     style={{
                //       minWidth: "300px",
                //       backgroundImage:
                //           // "url('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/flappingowl.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZmxhcHBpbmdvd2wuZ2lmIiwiaWF0IjoxNjI5NDk0NzI4LCJleHAiOjE5NDQ4NTQ3Mjh9.l4YhGnu8NaW8SOQBt-SH8v48ob__pckb7Tv3MyOyQ9c')",
                //         "url('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/sign/images/Bubble.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQnViYmxlLnBuZyIsImlhdCI6MTYyODY0MzczMywiZXhwIjoxOTQ0MDAzNzMzfQ.dI8BFOJk-032ydJfO5SiJdNOr-KPj7NILzu_Y5KVIS4')",
                //       backgroundSize: "contain",
                //       backgroundRepeat: "no-repeat",
                //       backgroundPosition: "center center",
                //       textAlign: "center",
                //       lineHeight: "20px",
                //     }}
                //   >
                //     {this.state.announcements
                //       .filter((announcement) => announcement.id === id)
                //       .map((announcement) => (
                //         <div>
                //           <h3>{announcement.head}</h3>
                //           <p>{announcement.body}</p>
                //         </div>
                //       ))}
                //   </div>
                // </Motion>
              ))}
            </Marquee> */}
          </Height>
        </FullWidth>
      );
    }
  }
}

// import React, { useEffect, useState } from "react";
// import {baseURL} from "../baseURL";
// import { fetcher } from "../services/fetcher";

// const Jumbo = () => {
//     const [announcement, setAdvice] = useState([]);

//     useEffect(() => {
//         const url = `${baseURL}/announcements`;

//         const fetchData = async () => {
//             try {
//                 const response = await fetcher(url);
//                 const json = await response.json();
//                 console.log(json);
//                 setAdvice(json);
//             } catch (error) {
//                 console.log("error", error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//       <div>
//         {announcement?.map(ann =>
//           <p>{ann.body}</p>)}
//       </div>
//     );
// };

// export default Jumbo;
