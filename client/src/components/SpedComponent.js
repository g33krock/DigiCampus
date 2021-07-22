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
  NavLink,
  NavItem,
  Nav,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import { SpedQuestionCreator } from "./CreateSpedQuestion";
import SpedResponse from "./SpedResponses";
import { SpedQuestionUpdater } from "./UpdateSpedQuestion";
import { DeleteSpedQuestion } from "./DeleteSpedQuestion";
import classnames from "classnames";
import { fetcher } from '../services/fetcher';

export default class Sped extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
    };
    this.state = { students: [], student: null, id: null, spedQuestions: [] };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
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
    fetcher(`${baseURL}/spedQuestions`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          spedQuestions: data,
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
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Raw Data
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Questions List
            </NavLink>
          </NavItem>
        </Nav>

        <Row>
          <Col>
            <Label for="scheduleStudent">Select Student</Label>
            <select id="scheduleStudent" onChange={this.onChange}>
              <option selected>None</option>
              {this.state.students
              .filter(student => student.iep === "yes")
              .sort(function (a, b){
                let x = a.firstName.toLowerCase();
                let y = b.firstName.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;})
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
                  <SpedQuestionCreator
                    studentId={this.state.student?.id}
                  ></SpedQuestionCreator>
                </CardBody>
              )}
            </Card>
          </div>
          <div className="col-md-9">
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                {this.state.student && (
                  <SpedResponse student={this.state.student}></SpedResponse>
                )}
              </TabPane>
              <TabPane tabId="2">
                <div class="tableFixHead">
                  <Table bordered hover size="sm">
                    <thead class="shadow">
                      <tr>
                        <th>
                          <h3>Date</h3>
                        </th>
                        <th>
                          <h3>Question</h3>
                        </th>
                        <th>
                          <h3>Category</h3>
                        </th>
                        <th>
                          <h3>Options</h3>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.spedQuestions
                        .filter(
                          (studentQ) =>
                            studentQ.student?.id === this.state.student?.id
                        )
                        .map((sped) => (
                          <tr>
                            <th key={sped.id}>{sped.date}</th>
                            <td>
                              <small>{sped.question}</small>
                            </td>
                            <td>
                              <small>{sped.category}</small>
                            </td>
                            <td>
                              <Row>
                                <Col>
                                  <SpedQuestionUpdater
                                    date={sped.date}
                                    question={sped.question}
                                    category={sped.category}
                                    spedQuestionId={sped.id}
                                  ></SpedQuestionUpdater>
                                </Col>
                                <Col>
                                  <DeleteSpedQuestion
                                    spedQuestion={sped.question}
                                    spedQuestionId={sped.id}
                                  ></DeleteSpedQuestion>
                                </Col>
                              </Row>
                              
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </Container>
    );
  }
}
