import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { Table } from "reactstrap";
import { fetcher } from '../services/fetcher';

export default class SpedResponse extends Component {
  constructor(props) {
    super(props);
    this.state = { speds: [], schedule: null, students: [], student: null, teachers:[] };
  }

  componentDidMount() {
    this.getSchedules()
  }

  getSchedules() {
    fetcher(`${baseURL}/spedResponses`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((speds) => {
          speds.sort((speda, spedb) => speda.date-spedb.date)
        this.setState({
          speds,
        })
      });
  }

  setSped(speds) {
    // sets student property to student object.  This looks funny because they both are named student
    this.setState({ speds: speds });
    console.log(speds);
  }


  render() {
    return (
      <div class="tableFixHead">
        <Table bordered hover size="sm">
          <thead class="shadow">
            <tr>
              <th>
                <h3>Date</h3>
              </th>
              <th>
                <h3>Teacher</h3>
              </th>
              <th>
                <h3>Question</h3>
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
            </tr>
          </thead>
          <tbody>
            {this.state.speds.filter(student => student.students?.id === this.props.student.id).map((sped) => (
              <tr>
                <th key={sped.id}>{sped.date}</th>
                <td>
                  <small>{sped.teachers?.firstName} {sped.teachers?.lastName}</small>
                </td>
                <td>
                  <small>{sped.question}</small>
                </td>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
