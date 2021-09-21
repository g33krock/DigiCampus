import React, { Component } from "react";
import { Container, Table } from "reactstrap";
import { fetcher } from "../services/fetcher";
import { baseURL } from "../baseURL";

export default class ProgressReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      gradebooks: [],
    };
  }

  componentDidMount() {
    fetcher(`${baseURL}/studentschedules?studentId=${this.props.student.id}`)
      .then((response) => response.json())
      .then((schedule) => {
        this.setState({
          schedule,
        });
      });
    fetcher(`${baseURL}/studentgradebooks?studentsId=${this.props.student.id}`)
      .then((response) => response.json())
      .then((gradebooks) => {
        this.setState({
          gradebooks,
        });
      });
    console.log(this.state.schedule);
  }

  render() {
    return (
      <Container>
        <Table bordered hover size="sm" className="tight">
          <thead>
            <tr id="scheduleHeader">
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.schedule
              .filter((sched) => sched.course.id !== 15)
              .filter((sched) => sched.course.id !== 48)
              .map((sclass) => (
                <tr key={sclass.course?.id}>
                  <td>{sclass.course?.name}</td>
                  <td>
                    {sclass.teacher?.firstName} {sclass.teacher?.lastName}
                  </td>
                  <td><small>Coming Soon!</small></td>
                  <td><small>Coming Soon!</small></td>
                  <td>
                    {(this.state.gradebooks
                      .filter(
                        (gradebook) => gradebook.courses.id === sclass.course.id
                      )
                      .reduce((a, b) => a + b.pointsEarned, 0) /
                      this.state.gradebooks
                        .filter(
                          (gradebook) =>
                            gradebook.courses.id === sclass.course.id
                        )
                        .reduce((a, b) => a + b.pointsAvailable, 0)*100).toFixed(2)}%
                  </td>
                  <td>{sclass?.status}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
