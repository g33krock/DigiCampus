// import { supabase } from "../../utils/supabaseClient";
import React, { Component } from "react";
import { baseURL } from "../baseURL";
import {
  Card,
  Row,
  Col,
  CardImg,
  CardBody,
  Label,
  Container,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";
import { StudentCreator } from "./CreateStudent";
// import {DeleteStudent} from "./DeleteStudent";
import { StudentUpdater } from "./UpdateStudent";
import AltStudentSchedule from "./AltStudentSchedule";
import { EmptyScheduleCreator } from "./EmptySchedule";
import { GuardianCreator } from "./CreateGuardian";
import TrackerResponse from "./TrackerResponses";
import classnames from "classnames";
import { fetcher } from "../services/fetcher";
import { IncidentCreator } from "./CreateIncident";
import Attendance from "./AttendanceComponent";
// import { UpdateGuardian } from "./UpdateGuardian";
import ProgressReport from "./ProgressReportComponent";
import { RelatedServiceCreator } from "./CreateRelatedService";
import { TallyComponent } from "./TallyComponent";
import StudentID from "./StudentID";
import { TallyQuestionCreator } from "./CreateTallyQuestion";
import { UpdateGuardian } from "./UpdateGuardian";

export default class AdminStudent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
    };
    this.state = {
      students: [],
      student: null,
      id: null,
      teacher: this.props.teacher,
      tallyQuestions: [],
    };
  }

  componentDidMount() {
    // Fetch Student Table from API
    fetcher(`${baseURL}/students`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          students: data,
        });
      });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onChange = (e) => {
    const studentId = Number(e.target.value);
    const student = this.state.students.find(
      (student) => student.id === studentId
    );
    this.setState({ student });
    console.log(this.state);
    console.log(e.target.value);
    fetcher(`${baseURL}/tallyQuestions`)
      .then((response) => response.json())
      .then((tdata) => {
        this.setState({
          tallyQuestions: tdata.filter(
            (datas) => datas?.student.id === studentId
          ),
        });
      });
  };

  render() {
    const first = this.state.student?.firstName;
    const last = this.state.student?.lastName;
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
              Schedule
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Student Tracking
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Attendance
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Progress Report
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "5" })}
              onClick={() => {
                this.toggle("5");
              }}
            >
              Tally
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "6" })}
              onClick={() => {
                this.toggle("6");
              }}
            >
              ID
            </NavLink>
          </NavItem>
        </Nav>
        <Row>
          <Col>
            <Label for="scheduleStudent">Select Student: </Label>
            <select id="scheduleStudent" onChange={this.onChange}>
              <option selected>None</option>
              {this.state.students
                .sort(function (a, b) {
                  let x = a.firstName.toLowerCase();
                  let y = b.firstName.toLowerCase();
                  if (x < y) {
                    return -1;
                  }
                  if (x > y) {
                    return 1;
                  }
                  return 0;
                })
                .map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
            </select>
          </Col>
          <Col>
            <StudentCreator></StudentCreator>
          </Col>
        </Row>
        <h1>
          Student: {first} {last}
        </h1>
        <div className="row">
          <div className="col-md-3">
            <Card body outline color="primary">
              {this.state.student && (
                <CardImg
                  src={`${this.state.student?.profile_image}`}
                  alt={`${this.state.student?.firstName}`}
                ></CardImg>
              )}
              {this.state.student && <h3>Guardian:</h3>}
              {this.state.student?.guardians.map((guardian) => (
                <div>
                  <p>
                    <strong>Parent:</strong> {guardian?.firstName}{" "}
                    {guardian?.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {guardian?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {guardian?.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {guardian?.address}
                  </p>
                  <UpdateGuardian
                    guardianId={guardian?.id}
                    firstName={guardian?.firstName}
                    lastName={guardian?.lastName}
                    phone={guardian?.phone}
                    email={guardian?.email}
                    address={guardian?.address}
                    additionalInfo={guardian?.guardian_additionalinfo}
                  />
                </div>
              ))}
              {this.state.student && <h3>Services:</h3>}
              {this.state.student?.relatedService.map((service) => (
                <div>
                  <strong>{service.relatedServiceRole.type}: </strong>
                  <p>
                    {service.teacher.firstName} {service.teacher.lastName}
                  </p>
                </div>
              ))}
              {this.state.student && <h3>Info:</h3>}
              {this.state.student && (
                <CardBody>
                  <p>
                    <strong>Campus:</strong> {this.state.student.campuses.name}
                  </p>
                  <p>
                    <strong>Grade:</strong> {this.state.student.grade}
                  </p>
                  <Row>
                    <Col md="4">
                      {/* <DeleteStudent 
                    studentId={this.state.student?.id}
                    studentFirstName={this.state.student?.firstName}
                    studentLastName={this.state.student?.lastName}>
                  </DeleteStudent> */}
                    </Col>
                    <Col md="2"></Col>
                    <Col md="4">
                      <StudentUpdater
                        studentId={this.state.student?.id}
                        studentFirstName={this.state.student?.firstName}
                        studentLastName={this.state.student?.lastName}
                        studentGrade={this.state.student?.grade}
                        studentBirth={this.state.student?.birthDate}
                        studentCampus={this.state.student?.campuses?.id}
                        studentMedInfo={this.state.student?.medical_information}
                        studentAddInfo={
                          this.state.student?.additional_information
                        }
                        studentIEP={this.state.student?.iep}
                        studentFunding={this.state.student?.funding?.id}
                        studentInstructionMode={
                          this.state.student?.instructionmode?.id
                        }
                        studentPreviousSchools={
                          this.state.student?.previousSchools
                        }
                        studentAllergies={this.state.student?.allergies}
                        studentHearingLimitations={
                          this.state.student?.hearingLimitations
                        }
                        studentVisionLimitations={
                          this.state.student?.visionLimitations
                        }
                        studentMobilityLimitations={
                          this.state.student?.mobilityLimitations
                        }
                        studentSensitivities={this.state.student?.sensitivities}
                        studentTherapies={this.state.student?.therapies}
                        studentMedicationsAtSchool={
                          this.state.student?.medicationsAtSchool
                        }
                        studentSocial={this.state.student?.social}
                        studentEmotional={this.state.student?.emotional}
                        studentPhysical={this.state.student?.physical}
                        studentMath={this.state.student?.math}
                        studentReading={this.state.student?.reading}
                        studentWriting={this.state.student?.writing}
                        studentInterests={this.state.student?.interests}
                        dailyReport={this.state.student?.dailyReport}
                        start={this.state.student?.start}
                        counselingMinutes={
                          this.state.student?.counselingMinutes
                        }
                        speechMinutes={this.state.student?.speechMinutes}
                        otMinutes={this.state.student?.otMinutes}
                        counselingScope={this.state.student?.counselingScope}
                        speechScope={this.state.student?.speechScope}
                        otScope={this.state.student?.otScope}
                        ptMinutes={this.state.student?.ptMinutes}
                        abaMinutes={this.state.student?.abaMinutes}
                        musicMinutes={this.state.student?.musicMinutes}
                        ptScope={this.state.student?.ptScope}
                        abaScope={this.state.student?.abaScope}
                        musicScope={this.state.student?.musicScope}
                        district={this.state.student?.district?.id}
                      ></StudentUpdater>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <EmptyScheduleCreator
                        studentId={this.state.student?.id}
                        studentFirstName={this.state.student?.firstName}
                        studentLastName={this.state.student?.lastName}
                        campusId={this.state.student?.campuses.id}
                      ></EmptyScheduleCreator>
                    </Col>
                    <Col md="2"></Col>
                    <Col md="4">
                      <GuardianCreator
                        studentId={this.state.student?.id}
                      ></GuardianCreator>
                    </Col>
                    <Col md="4">
                      <IncidentCreator
                        teacher={this.state.teacher}
                        student={this.state.student}
                      ></IncidentCreator>
                    </Col>
                    <Col md="4">
                      <RelatedServiceCreator
                        studentId={this.state.student?.id}
                      ></RelatedServiceCreator>
                    </Col>
                  </Row>
                </CardBody>
              )}
            </Card>
          </div>
          <div className="col-md-9">
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                {this.state.student && (
                  <AltStudentSchedule
                    student={this.state.student}
                  ></AltStudentSchedule>
                )}
              </TabPane>
              <TabPane tabId="2">
                {this.state.student && (
                  <TrackerResponse
                    student={this.state.student}
                  ></TrackerResponse>
                )}
              </TabPane>
              <TabPane tabId="3">
                {this.state.student && (
                  <Attendance student={this.state.student}></Attendance>
                )}
              </TabPane>
              <TabPane tabId="4">
                {this.state.student && (
                  <ProgressReport student={this.state.student}></ProgressReport>
                )}
              </TabPane>
              <TabPane tabId="5">
                <TallyQuestionCreator student={this.state.student} />
                {this.state?.tallyQuestions.map((tquest) => (
                  <TallyComponent
                    tallyQuestionsId={tquest.id}
                    tallyQuestionsQuestion={tquest.question}
                    teacher={this.state.teacher}
                    student={this.state.student}
                  ></TallyComponent>
                ))}
              </TabPane>
              <TabPane tabId="6">
                <StudentID student={this.state.student}></StudentID>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </Container>
    );
  }
}
