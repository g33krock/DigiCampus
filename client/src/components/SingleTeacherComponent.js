import React, { Component } from "react";
import { baseURL } from "../baseURL";
import {
  Container,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  NavItem,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import TeacherSchedule from "./TeacherScheduleComponent";
import TeacherGroupSchedule from "./TeacherGroupScheduleComponent";
import { fetcher } from "../services/fetcher";
import TeacherTrackerResponse from "./TeacherTrackerResponses";

export default class SingleTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };
    this.state = { teachers: [], teacher: null };
  }

  componentDidMount() {
    // Fetch Student Table from API
    fetcher(`${baseURL}/teachers`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          teachers: data,
        });
      })
      .then(() => {
        this.setState({
          teacher: this.state.teachers.find(
            (teacher) => teacher.email === this.props?.userEmail
          ),
        });
      });
    console.log(this.props?.userEmail);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  // textSwitch(randomInt) {
  //   switch (randomInt) {
  //     case 0:
  //       return "start a rock band and tour Ohio";
  //     case 1:
  //       return "invent 38 new flavors of hashbrowns";
  //     case 2:
  //       return "run for president without disclosing their party affiliation";
  //     case 3:
  //       return "host a reality dating show featuring gorillas";
  //     case 4:
  //       return "discover a magical land accessible through a sock drawer";
  //     case 5:
  //       return "become a stunt double for a potato";
  //     case 6:
  //       return "decipher the secret language of marionettes";
  //     case 7:
  //       return "become a teaching ninja";
  //     case 8:
  //       return "become a teaching pirate";
  //     default:
  //       return "buy Dallas a Dr. Pepper";
  //   }
  // }

  // picSwitch(randomInt) {
  //   switch (randomInt) {
  //     case 0:
  //       return "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/thewave.png";
  //     case 1:
  //       return "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/spikeamerica.png";
  //     default:
  //       return "https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/spikehawk.png";
  //   }
  // }

  render() {
    // const getRandomInt = () => {
    //   return Math.floor(Math.random() * 3);
    // };
    const date = new Date();
    return (
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              One to One
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Group
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Tracker Entries
            </NavLink>
          </NavItem>
        </Nav>
        <div>
        <Row>
            <Col>
              <Row>
                <Container className="parent">
                  <img
                    className="image1"
                    style={{ width: 100, borderRadius: 60 / 2 }}
                    src={this.state.teacher?.image}
                  />
                  {/* <img
                    className="image2"
                    style={{ width: 80, borderRadius: 60 / 2 }}
                    src={this.picSwitch(getRandomInt())}
                  /> */}
                </Container>
              </Row>
            </Col>
            <Col xs="9" style={{ justifyContent: "left", bottom: 0 }}>
              <h1>Have a great Fall Break!!!</h1>
            </Col>
          </Row>
          Hello {this.state.teacher?.firstName}{" "}
        </div>
        <h3>Link: {this.state.teacher?.link}</h3>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.state.teacher && (
              <TeacherSchedule
                teacher={this.state.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherSchedule>
            )}
          </TabPane>
          <TabPane tabId="2">
            <h3>Ahoy!</h3>
            {this.state.teacher && (
              <TeacherGroupSchedule
                teacher={this.state.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherGroupSchedule>
            )}
          </TabPane>
          <TabPane tabId="3">
            {this.state.teacher && (
              <TeacherTrackerResponse
                startDate="2021-08-04"
                endDate={`${date.getFullYear()}-${(
                  "0" +
                  (date.getMonth() + 1)
                ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`}
                teacher={this.state.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherTrackerResponse>
            )}
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}
