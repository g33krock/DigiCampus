import React, { Component } from "react";
import { Table } from "reactstrap";
import { fetcher } from "../services/fetcher";
import { baseURL } from "../baseURL";
import { spedQuestionService } from "../services/spedQuestionService";
// import { spedResponseService } from "../services/spedResponseService";

export default class SpedResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speds: [],
      speQ: [],
      schedule: null,
      students: [],
      student: null,
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

  getResponses() {
    fetcher(`${baseURL}/spedResponses?studentsId=${this.props.student.id}`)
    .then((response) => response.json())
    .then((speds) => {
        speds
        .sort(function (a, b) {
          let x = b.date;
          let y = a.date;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        })
      this.setState({
        speds: speds,
      })
      console.log(this.state.speds)
    });
  }

  setSped(speds) {
    this.setState({ speds: speds });
    console.log(speds);
  }

  render() {
    return (
      <div class="tableFixHead">
        {this.state.speQ
        .filter((stu) => stu.student?.id === this.props.student.id)
        .map((quest) => (
          <div>
            <h3>{quest.question}</h3>
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
              <h3>              
                {(this.state.speds
                .filter((speQues) => speQues?.question === quest?.question)
                .filter((dog) => dog.meet === "true" || dog.meet === "false" || dog.meet === "IP")
                .reduce((a, b) => a + b.success, 0)/(this.state.speds
                  .filter((speQues) => speQues.question === quest.question)
                  .filter((dog) => dog.meet === "true" || dog.meet === "false" || dog.meet === "IP").reduce((a, b) => a + b.opportunity, 0))*100).toFixed(2)}%</h3>

              {this.state.speds
                .filter((speQues) => speQues?.question === quest?.question)
                .filter((dog) => dog.meet === "true" || dog.meet === "false" || dog.meet === "IP")
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
