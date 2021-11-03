import React, { Component } from "react";
import { Table, Row, Col, Label, Input, Button, Form } from "reactstrap";
import { fetcher } from "../services/fetcher";
import { baseURL } from "../baseURL";
import { spedQuestionService } from "../services/spedQuestionService";
import { SpedResponseUpdater } from "./UpdateSpedResponse";
// import { spedResponseService } from "../services/spedResponseService";

const date = new Date();

const today =
  date.getFullYear().toString() +
  "-" +
  (date.getMonth() + 1).toString().padStart(2, 0) +
  "-" +
  date.getDate().toString().padStart(2, 0)

export default class SpedResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speds: [],
      speQ: [],
      schedule: null,
      students: [],
      student: null,
      startDate: "2021-08-30",
      endDate: today,
      teachers: [],
    };
  }

  componentDidMount() {
    this.getSchedules();
    this.getResponses();
  }

  async getSchedules() {
    const spedQuestions = await spedQuestionService.all();
    this.setState({ speQ: spedQuestions });
  }

  async saveTheDate() {
    const date = await this.setState({
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
    });
    console.log(date);
    console.log(`Start: ${this.state.startDate}  End: ${this.state.endDate}`);
    this.getResponses();
  }

  getResponses() {
    fetcher(`${baseURL}/spedResponses?studentsId=${this.props.student.id}`)
      .then((response) => response.json())
      .then((speds) => {
        speds.sort(function (a, b) {
          let x = b.date;
          let y = a.date;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        this.setState({
          speds: speds
            .filter((sped) => sped?.date >= this.state?.startDate)
            .filter((sped) => sped?.date <= this.state?.endDate),
        });
        console.log(this.state.speds);
      });
  }

  render() {
    return (
      <div class="tableFixHead">
        <Col md="12">
          <Form>
            <Row>
              <Col md="5">
                <Label for="startDate">
                  <small>Start Date</small>
                </Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  placeholder="Start"
                />
              </Col>
              <Col md="5">
                <Label for="endDate">
                  <small>End Date</small>
                </Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  placeholder="End"
                />
              </Col>
              <Col md="2">
                <Button
                  color="link"
                  size="sm"
                  onClick={() => {
                    this.saveTheDate();
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        {this.state.speQ
          .filter((stu) => stu.student?.id === this.props.student.id)
          .map((quest) => (
            <div>
              <h3>{quest.question}</h3>
              <strong>
                Meets:
                {(
                  (this.state.speds
                    .filter((speQues) => speQues?.question === quest?.question)
                    .filter((dog) => dog.meet === "true").length /
                    this.state.speds
                      .filter((speQues) => speQues.question === quest.question)
                      .filter(
                        (dog) => dog.meet === "true" || dog.meet === "false"
                      ).length) *
                  100
                ).toFixed(2)}
                %
              </strong>
              <strong>
                {" "}
                Successes/Opportunities:
                {(
                  (this.state.speds
                    .filter((speQues) => speQues?.question === quest?.question)
                    .filter(
                      (dog) =>
                        dog.meet === "true" ||
                        dog.meet === "false" ||
                        dog.meet === "IP"
                    )
                    .reduce((a, b) => a + b.success, 0) /
                    this.state.speds
                      .filter((speQues) => speQues.question === quest.question)
                      .filter(
                        (dog) =>
                          dog.meet === "true" ||
                          dog.meet === "false" ||
                          dog.meet === "IP"
                      )
                      .reduce((a, b) => a + b.opportunity, 0)) *
                  100
                ).toFixed(2)}
                %
              </strong>
              <Table bordered hover size="sm">
                <thead class="shadow">
                  <tr>
                    <th>
                      <h3>Date</h3>
                    </th>
                    <th>
                      <h3>Meet</h3>
                    </th>
                    <th>
                      <h3>Successes</h3>
                    </th>
                    <th>
                      <h3>Opportunities</h3>
                    </th>
                    <th>
                      <h3>Comment</h3>
                    </th>
                    <th>
                      <h3>Teacher</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.speds
                    .filter((speQues) => speQues?.question === quest?.question)
                    .filter(
                      (dog) =>
                        dog.meet === "true" ||
                        dog.meet === "false" ||
                        dog.meet === "IP"
                    )
                    .sort(function (a, b) {
                      let x = a.date;
                      let y = b.date;
                      if (x < y) {
                        return -1;
                      }
                      if (x > y) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((sped) => (
                      <tr>
                        <th key={sped.id}>{sped.date}</th>
                        <td>
                          <small>{sped.meet}</small>
                        </td>
                        <td>
                          <small>{sped.success}</small>
                        </td>
                        <td>
                          <small>{sped.opportunity}</small>
                        </td>
                        <td>
                          <small>{sped.response}</small>
                        </td>
                        <td>
                          <small>
                            {sped.teachers?.firstName} {sped.teachers?.lastName}
                          </small>
                        </td>
                        <td>
                          <SpedResponseUpdater
                            callback={() => this.getResponses()}
                            spedResponseMeet={sped.meet}
                            spedResponseSuccess={sped.success}
                            spedResponseOpportunity={sped.opportunity}
                            spedResponseResponse={sped.response}
                            spedResponseId={sped.id}
                            studentId={this.props.student.id}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          ))}
      </div>
    );
  }
}
