import React, { Component } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import Collapsible from "react-collapsible";
import { videoService } from "../../services/videoService";

export class VideoSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalc: true,
      videos: [],
      video: {
      },
    };
  }

  async componentDidMount() {
    const videos = await videoService.all();
    this.setState({ videos });
    console.log(this.state.videos);
  };


  setVideo = (vid) => {
    const videoId = vid.target.value;
    const video = this.state.videos.find((video) => `${video.id}` === `${videoId}`);
    console.log(this.state.videos);
    console.log(video);
    this.setState({ video });
    console.log(this.state.video);
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
                      .map((vid) => (
                        <option
                          tabIndex={vid.id}
                          className="selectVideo"
                          value={vid.id}
                          onClick={this.setVideo}
                        >
                          {`${vid.title}`}
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
                          Onboarding
                        </h4>,
                      ]}
                    >
                      {this.state.videos
                        .filter((vid) => vid.category === "training")
                        .map((vid) => (
                          <option
                            tabIndex={vid.id}
                            className="selectVideo"
                            value={vid.id}
                            onClick={this.setVideo}
                            style={{ marginLeft: "30px" }}
                          >
                            {vid.title}
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
                            tabIndex={vid.id}
                            className="selectVideo"
                            value={vid.id}
                            onClick={this.setVideo}
                            style={{ marginLeft: "30px" }}
                          >
                            {vid.title}
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
                          SPED
                        </h4>,
                      ]}
                    >
                      {this.state.videos
                        .filter((vid) => vid.category === "sped")
                        .map((vid) => (
                          <option
                            tabIndex={vid.id}
                            className="selectVideo"
                            value={vid.id}
                            onClick={this.setVideo}
                            style={{ marginLeft: "30px" }}
                          >
                            {vid.title}
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
                  <div className="col"
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
                        position: "absolute",
                        left: "0px",
                      }}
                    />
                  </div>
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
                </Row>
                <Row
                  style={{
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    backgroundColor: "white",
                    borderRight: "4px solid black",
                  }}
                >
                </Row>
                <Row
                  style={{
                    marginTop: "5%",
                    marginBottom: "5%",
                    paddingBottom: "5%",
                    borderBottom: "1px solid black",
                  }}
                >
                </Row>
                <Row
                  style={{
                    marginTop: "5%",
                    marginBottom: "5%",
                    paddingBottom: "5%",
                    borderBottom: "1px solid black",
                  }}
                >
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
                </Row>
              </Col>
            </Row>
          
      </Container>
    );
  }
}
