import React, { Component } from "react";
import { connect } from 'react-redux';
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
import TeacherTrackerResponse from "./TeacherTrackerResponses";
import StaffID from "./StaffID";

class SingleTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };
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
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Staff ID
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
                    // src={this.props.teacher?.image}
                    src="https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/DallasLovell.jpg"
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
            </Col>
          </Row>
          Hello {this.props.teacher?.firstName}{" "}
        </div>
        <h3>Link: {this.props.teacher?.link}</h3>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.props.teacher && (
              <TeacherSchedule
                teacher={this.props.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherSchedule>
            )}
          </TabPane>
          <TabPane tabId="2">
            <h3>Ahoy!</h3>
            {this.props.teacher && (
              <TeacherGroupSchedule
                teacher={this.props.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherGroupSchedule>
            )}
          </TabPane>
          <TabPane tabId="3">
            {this.props.teacher && (
              <TeacherTrackerResponse
                startDate="2021-08-04"
                endDate={`${date.getFullYear()}-${(
                  "0" +
                  (date.getMonth() + 1)
                ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`}
                teacher={this.props.teacher}
                userEmail={this.props?.userEmail}
              ></TeacherTrackerResponse>
            )}
          </TabPane>
          <TabPane tabId="4">
            <StaffID teacher={this.props.teacher}></StaffID>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    teachers: state.teachers,
    teacher: state.teacher,
  };
};

 export default connect(mapState, null)(SingleTeacher);
