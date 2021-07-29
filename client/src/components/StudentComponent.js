// import { supabase } from "../../utils/supabaseClient";
import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { Card, Row, Col, CardImg, CardBody, Label, Container } from "reactstrap";
import {StudentCreator} from "./CreateStudent";
// import {DeleteStudent} from "./DeleteStudent";
import {StudentUpdater} from "./UpdateStudent";
import AltStudentSchedule from "./AltStudentSchedule";
// import { EmptyScheduleCreator } from "./EmptySchedule";
import { GuardianCreator } from "./CreateGuardian";
import { fetcher } from '../services/fetcher';


export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [], student: null, id: null};
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

  onChange = e => {
    const studentId = Number(e.target.value)
    const student = this.state.students.find(student => student.id === studentId) 
    this.setState({ student });
    console.log(this.state)
    console.log(e.target.value)
  }
  
  render() {
    const first = this.state.student?.firstName;
    const last = this.state.student?.lastName;
    return (
      <Container>
        <Row>
          <Col>
            <Label for="scheduleStudent">Select Student: </Label>
            <select id="scheduleStudent" onChange={this.onChange}>
              <option selected>None</option>
              {this.state.students
              .filter(
                    (cstudent) =>
                      cstudent.campuses.id === this.props?.campus?.id
                  ).sort(function (a, b){
                    let x = a.firstName.toLowerCase();
                    let y = b.firstName.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;})
              .map(student => 
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
              )}
            </select>
          </Col>
          <Col>
            <StudentCreator></StudentCreator>
          </Col>
        </Row>
        <h1>Student: {first} {last}</h1>
        <div className="row">
          <div className="col-md-3">
            <Card body outline color="primary">
              {this.state.student && <CardImg src={`${this.state.student?.profile_image}`} alt={`${this.state.student?.firstName}`}></CardImg>}
              {this.state.student?.guardians.map((guardian) => (
                  <div>
                    <p>
                      <strong>Parent:</strong> {guardian?.firstName} {guardian?.lastName}
                    </p>
                    <p><strong>Email:</strong> {guardian?.email}</p>
                    <p><strong>Phone:</strong> {guardian?.phone}</p>
                    <p><strong>Address:</strong> {guardian?.address}</p>
                  </div>
                ))}
              {this.state.student &&<CardBody>
                <p><strong>Campus:</strong> {this.state.student.campuses.name}</p>
                <p><strong>Grade:</strong> {this.state.student.grade}</p>
                <p><strong>Additional Information:</strong> {this.state.student.additional_information}</p>
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
                    studentAddInfo={this.state.student?.additional_information}
                    studentIEP={this.state.student?.iep}
                    studentFunding={this.state.student?.funding?.id}
                    studentInstructionMode={this.state.student?.instructionmode?.id}
                    studentPreviousSchools={this.state.student?.previousSchools}
                    studentAllergies={this.state.student?.allergies}
                    studentHearingLimitations={this.state.student?.hearingLimitations}
                    studentVisionLimitations={this.state.student?.visionLimitations}
                    studentMobilityLimitations={this.state.student?.mobilityLimitations}
                    studentSensitivities={this.state.student?.sensitivities}
                    studentTherapies={this.state.student?.therapies}
                    studentMedicationsAtSchool={this.state.student?.medicationsAtSchool}
                    studentSocial={this.state.student?.social}
                    studentEmotional={this.state.student?.emotional}
                    studentPhysical={this.state.student?.physical}
                    studentMath={this.state.student?.math}
                    studentReading={this.state.student?.reading}
                    studentWriting={this.state.student?.writing}
                    studentInterests={this.state.student?.interests}>
                  </StudentUpdater>
                </Col>
                </Row>
                <Row>
                  <Col md="4">
                    {/* <EmptyScheduleCreator 
                      studentId={this.state.student?.id}
                      studentFirstName={this.state.student?.firstName}
                      studentLastName={this.state.student?.lastName}
                      campusId={this.state.student?.campuses.id}>
                    </EmptyScheduleCreator> */}
                  </Col>
                  <Col md="2"></Col>
                  <Col md="4">
                    <GuardianCreator
                      studentId={this.state.student?.id}
                    >
                    </GuardianCreator>
                  </Col>
                </Row>
        
              </CardBody>}
            </Card>
          </div>
          <div className="col-md-9">
            {this.state.student && <AltStudentSchedule student={this.state.student}></AltStudentSchedule>}
          </div>
        </div>
        
      </Container>
    );
  }
}
