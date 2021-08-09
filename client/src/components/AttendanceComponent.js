import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { Table } from "reactstrap";
import { fetcher } from '../services/fetcher';

export default class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = { trackers: [], schedule: null, students: [], student: null };
  }

  componentDidMount() {
    this.getSchedules()
  }

  getSchedules() {
    fetcher(`${baseURL}/trackers`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((trackers) => {
          trackers.sort((trackera, trackerb) => trackera?.date-trackerb?.date)
        this.setState({
          trackers,
        })
        console.log(this.state.trackers)
      });
  }

  setTracker(trackers) {
    // sets student property to student object.  This looks funny because they both are named student
    this.setState({ trackers: trackers });
    console.log(trackers);
  }


  render() {
    return (
      <div class="tableFixHead">
        <Table bordered hover size="sm">
          <thead class="shadow">
            <tr>
              <th>
                <strong>Date</strong>
              </th>
              <th>
                <strong>Attendance</strong>
              </th>
              <th>
                <strong>Course</strong>
              </th>
              <th>
                <strong>Teacher</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.trackers.filter(studentz => studentz.students?.id === this.props.student.id).sort((a, b) => a?.date - b?.date).map((tracker) => (
              <tr>
                <th key={tracker.id}>{tracker?.date}</th>
                <td>
                  <small>{tracker?.attendance}</small>
                </td>
                <td>
                  <small>{tracker?.courses.name}</small>
                </td>
                <td>
                  <small>{tracker?.teachers.firstName} {tracker?.teachers.lastName}</small>
                </td>
               </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
