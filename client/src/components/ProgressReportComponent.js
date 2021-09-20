import React, { Component } from 'react';
import { Container, Table } from "reactstrap";
import { fetcher } from "../services/fetcher";
import { baseURL } from "../baseURL";

export default class ProgressReport extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            schedule: [],
            gradebooks: []
        }
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
      console.log(this.state.schedule)
    }

    render() {
        return(
          <div class="tableFixHead">
            <Container>
              <Table bordered hover size="sm" className="tight">
                <thead class="shadow">
                  <tr id="scheduleHeader">
                    <th>Course Name</th>
                    <th>Instructor</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.schedule.map(sclass => 
                    (<tr key={sclass.id}>
                      <td>{sclass.course?.name}</td>
                    </tr>)
                  )}
                </tbody>
              </Table>
            </Container>
          </div>
        )
    }
}