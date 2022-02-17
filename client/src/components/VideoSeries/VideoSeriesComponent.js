import React, { Component } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import Collapsible from "react-collapsible";
// import { agentService } from "../../services/AgentService";
import { videoService } from "../../services/videoService";
// import { VideoCalendar } from "./VideoCalendarComponent";
// import { FullCalc } from "./FullCalcComponent";
// import Auth from "../../Auth";

export class VideoSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalc: true,
      videos: [],
      video: {
        id: "1",
        created_at: "2021-12-17T17:28:05.000Z",
        title: "Welcome to Compound Interest",
        vidlink:
          "https://compoundinterest.com/wp-content/uploads/2021/11/01-Welcome-To-Compound-Interest-1.mp4",
        poster:
          "https://compoundinterest.com/wp-content/uploads/2021/11/Chapter-1_-Welcome-to-Compound-Interest_-The-Retirement-You-Deserve.png",
        number: 1,
        category: "none",
        curtisBanner: "block",
        user: null,
      },
    };
  }

  async componentDidMount() {
    const videos = await videoService.all();
    this.setState({ videos });
    console.log(videos);
  };

  async updateState() {
    const videos = await videoService.all();
    this.setState({ videos });
    console.log(videos);
  }

  switchShowCalc() {
    this.setState({ showCalc: false });
    this.setState({ colHeight: "100vh" });
    this.setCalcVideo();
  }

  setCalcVideo = () => {
    const video = this.state.videos.find((video) => video.id === "18");
    this.setState({ video });
    this.setState({ curtisBanner: "none" });
  };

  setVideo = (vid) => {
    const videoId = vid.target.value;
    console.log(vid.value);
    const video = this.state.videos.find((video) => video.id === videoId);
    this.setState({ video });
    console.log(this.state.video);
    this.theCurtisBlock();
  };

  theCurtisBlock = () => {
    if (this.state.video.id < 17) {
      this.setState({ curtisBanner: "block" });
    } else {
      this.setState({ curtisBanner: "none" });
    }
    setTimeout(() => this.theCurtisBlockAgain(), 500);
  };

  theCurtisBlockAgain = () => {
    if (this.state.video.id < 17) {
      this.setState({ curtisBanner: "block" });
    } else {
      this.setState({ curtisBanner: "none" });
    }
  };

  freeVideo = (vid) => {
    if (vid.isFree === true) {
      return;
    } else if (vid.isFree === false && this.props.vids === false) {
      return "disabled: 'disabled'";
    } else if (vid.isFree === false && this.props.vids === true) {
      return;
    } else {
      return "disabled: 'disabled'";
    }
  };

  render() {
    return (
      <Container
        fluid
        style={{
          backgroundColor: "rgb(211, 211, 211)",
          border: "4px solid black",
        }}
      >
        
            <Row
              style={{
                position: "relative",
                color: "black",
              }}
              
            >
              <Col
                sm={3}
                style={{
                  maxHeight: "100vh",
                  paddingRight: "0px",
                  backgroundColor: "rgba(211, 211, 211)",
                }}
              >
                {/* <Row
                  style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    paddingBottom: "2%",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Button
                    className="videoButton"
                    style={{
                      width: "65%",
                    }}
                  >
                    Secure Compound Interest
                    <br />
                    Webinar Replay
                  </Button>
                </Row>
                <Row
                  style={{
                    marginTop: "2%",
                    paddingBottom: "2%",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Button
                    className="videoButton"
                    style={{
                      width: "65%",
                    }}
                  >
                    MPI®
                    <br />
                    Documentary
                  </Button>
                </Row> */}
                {/* <Row></Row> */}
                <Container
                  style={{
                    backgroundColor: "rgba(211, 211, 211)",
                    borderRadius: "5px",
                    padding: "0px",
                  }}
                >
                  <Row
                    style={{
                      borderBottom: "2px solid black",
                      backgroundColor: "grey",
                      color: "black",
                      paddingTop: "2%",
                    }}
                  >
                    <h3>
                      <strong>Video Series</strong>
                    </h3>
                  </Row>
                  <Col
                    style={{
                      paddingLeft: "1%",
                      backgroundColor: "white",
                      overflowY: "scroll",
                      maxHeight: "75vh",
                    }}
                  >
                    {this.state.videos
                      .filter((vid) => vid.category === "none")
                      .filter((vid) => vid.id < 10)
                      .map((vid) => (
                        <option
                          disabled={this.freeVideo(vid)}
                          tabIndex={vid.id}
                          className="selectVideo"
                          value={vid.id}
                          onClick={this.setVideo}
                        >
                          {`${vid.id}  | ${vid.title}`}
                        </option>
                      ))}
                    {this.state.videos
                      .filter((vid) => vid.category === "none")
                      .filter((vid) => vid.id > 9)
                      .map((vid) => (
                        <option
                          disabled={this.freeVideo(vid)}
                          tabIndex={vid.id}
                          className="selectVideo"
                          value={vid.id}
                          onClick={this.setVideo}
                        >
                          {vid.id}| {vid.title}
                        </option>
                      ))}
                    <Collapsible
                      className="collapsibleSelectVideo"
                      trigger={[
                        <BsChevronDown
                          style={{ marginRight: "10px", fontSize: "150%" }}
                        />,
                        <h4
                          id="bigMonty"
                          style={{ fontSize: "110%", textAlign: "left" }}
                        >
                          {" "}
                          Teaching Guides
                        </h4>,
                      ]}
                    >
                      {this.state.videos
                        .filter((vid) => vid.category === "teaching")
                        .map((vid) => (
                          <option
                            disabled={this.freeVideo(vid)}
                            tabIndex={vid.id}
                            className="selectVideo"
                            value={vid.id}
                            onClick={this.setVideo}
                            style={{ marginLeft: "30px" }}
                          >
                            {vid.id} | {vid.title}
                          </option>
                        ))}
                    </Collapsible>
                    <Collapsible
                      className="collapsibleSelectVideo"
                      trigger={[
                        <BsChevronDown
                          style={{ marginRight: "10px", fontSize: "150%" }}
                        />,
                        <h4
                          id="bigMonty"
                          style={{ fontSize: "110%", textAlign: "left" }}
                        >
                          {" "}
                          Technical Guides{" "}
                        </h4>,
                      ]}
                    >
                      {this.state.videos
                        .filter((vid) => vid.category === "technical")
                        .map((vid) => (
                          <option
                            disabled={this.freeVideo(vid)}
                            tabIndex={vid.id}
                            className="selectVideo"
                            value={vid.id}
                            onClick={this.setVideo}
                            style={{ marginLeft: "30px" }}
                          >
                            {vid.id} | {vid.title}
                          </option>
                        ))}
                    </Collapsible>
                    <Collapsible
                      className="collapsibleSelectVideo"
                      trigger={[
                        <BsChevronDown
                          style={{ marginRight: "10px", fontSize: "150%" }}
                        />,
                        <h4
                          id="bigMonty"
                          style={{ fontSize: "110%", textAlign: "left" }}
                        >
                          {" "}
                          STEAM
                        </h4>,
                      ]}
                    >
                      {this.state.videos
                        .filter((vid) => vid.category === "steam")
                        .map((vid) => (
                          <option
                            disabled={this.freeVideo(vid)}
                            tabIndex={vid.id}
                            className="selectVideo"
                            value={vid.id}
                            onClick={this.setVideo}
                            style={{ marginLeft: "30px" }}
                          >
                            {vid.id} | {vid.title}
                          </option>
                        ))}
                    </Collapsible>
                  </Col>
                </Container>
              </Col>
              <Col
                sm={7}
                style={{
                  backgroundColor: "rgb(225, 225, 225",
                  overflowY: "scroll",
                  maxHeight: "100vh",
                }}
              >
                <Row>
                  <h1 className="videoseriestitle">AZ Aspire Academy</h1>
                  <h2 className="videoseriessubtitle">
                    Education On Your Terms
                  </h2>
                </Row>
                <Row
                  style={{
                    marginBottom: "1%",
                    marginTop: "1%",
                    display: this.state.curtisBanner,
                  }}
                >
                  <Container
                    style={{
                      backgroundColor: "grey",
                      width: "75%",
                      borderRadius: "5px",
                      color: "black",
                      fontWeight: "700",
                      paddingBottom: "1%",
                      paddingTop: "1%",
                    }}
                  >
                    <h3>Training</h3>
                  </Container>
                </Row>
                <Row style={{ padding: "1%" }}>
                  <div
                    style={{ position: "relative", paddingBottom: "56.25%" }}
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={this.state.video.vidlink}
                      title={this.state.video.title}
                      frameBorder="4"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        border: "4px solid black",
                        backgroundColor: "black",
                        // position: "absolute",
                        // left: "0px",
                      }}
                    />
                  </div>
                </Row>
                <Row>
                  <h2 className="videofoot">ALWAYS BE COMPOUNDING™</h2>
                </Row>
                <div id="theCalculator" hidden={this.state.showCalc}>
                </div>
              </Col>
              <Col style={{ backgroundColor: "rgb(100, 100,100" }}>
                <Row
                  style={{
                    paddingTop: "5%",
                    paddingBottom: "5%",
                    backgroundColor: "white",
                    borderRight: "4px solid black",
                  }}
                >
                  {/* <Image
                    fluid
                    src={ag.profileMPIGrey ? ag.profileMPIGrey : ag.profilePic}
                  /> */}
                </Row>
                <Row
                  style={{
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    backgroundColor: "white",
                    borderRight: "4px solid black",
                  }}
                >
                  {/* <Image fluid src={ag.logo} /> */}
                  {/* <p className="emailSize">{ag.email}</p> */}
                </Row>
                <Row
                  style={{
                    marginTop: "5%",
                    marginBottom: "5%",
                    paddingBottom: "5%",
                    borderBottom: "1px solid black",
                  }}
                >
                  {/* <VideoCalendar agent={ag} deposit={this.props.deposit} /> */}
                </Row>
                <Row
                  style={{
                    marginTop: "5%",
                    marginBottom: "5%",
                    paddingBottom: "5%",
                    borderBottom: "1px solid black",
                  }}
                >
                  {/* <div>
                    <Button
                      className="videoButton"
                      onClick={() => this.switchShowCalc()}
                      style={{
                        marginBottom: "0px",
                        alignItems: "center",
                        paddingTop: "18px",
                      }}
                    >
                      MPI® Calculator
                    </Button>
                  </div> */}
                </Row>
                <Row
                  style={{
                    marginTop: "5%",
                    marginBottom: "5%",
                    paddingBottom: "5%",
                    borderBottom: "1px solid black",
                    display:"none"
                  }}
                >
                  <div>
                    {/* <Button className="videoButton">Share</Button> */}
                    {/* <Auth /> */}
                  </div>
                </Row>
                <Row
                  style={{
                    marginTop: "5%",
                    marginBottom: "5%",
                    paddingBottom: "5%",
                    borderBottom: "1px solid black",
                    display:"none"
                  }}
                >
                  {/* <div>
                    <Button className="videoButton">Leave A Review</Button>
                  </div> */}
                </Row>
              </Col>
            </Row>
          
      </Container>
    );
  }
}
