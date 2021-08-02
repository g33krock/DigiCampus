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
} from "reactstrap";
import AltStudentSchedule from "./AltStudentSchedule";
import { fetcher } from "../services/fetcher";
import { IncidentCreator } from "./CreateIncident";

export default class Sub extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [], student: null, id: null, teacher: this.props.teacher };
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

  onChange = (e) => {
    const studentId = Number(e.target.value);
    const student = this.state.students.find(
      (student) => student.id === studentId
    );
    this.setState({ student });
    console.log(this.state);
    console.log(e.target.value);
  };

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
                  (cstudent) => cstudent.campuses.id === this.props?.campus?.id
                )
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
                </div>
              ))}
              {this.state.student && (
                <CardBody>
                  <p>
                    <strong>Campus:</strong> {this.state.student.campuses.name}
                  </p>
                  <p>
                    <strong>Grade:</strong> {this.state.student.grade}
                  </p>
                  <p>
                    <strong>Additional Information:</strong>{" "}
                    {this.state.student.additional_information}
                  </p>
                  <IncidentCreator
                    teacher={this.state.teacher}
                    student={this.state.student}
                  ></IncidentCreator>
                </CardBody>
              )}
            </Card>
          </div>
          <div className="col-md-9">
            {this.state.student && (
              <AltStudentSchedule
                student={this.state.student}
              ></AltStudentSchedule>
            )}
          </div>
        </div>
      </Container>
    );
  }
}
