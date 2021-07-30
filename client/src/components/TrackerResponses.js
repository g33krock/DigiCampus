import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { Table } from "reactstrap";
import { fetcher } from '../services/fetcher';

export default class TrackerResponse extends Component {
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
                <strong>Lesson</strong>
              </th>
              <th>
                <strong>Comprehension</strong>
              </th>
              <th>
                <strong>Engagement</strong>
              </th>
              <th>
                <strong>Behavior</strong>
              </th>
              <th>
                <strong>Assessment</strong>
              </th>
              <th>
                <strong>SEL 1</strong>
              </th>
              <th>
                <strong>SEL 2</strong>
              </th>
              <th>
                <strong>SEL 3</strong>
              </th>
              <th>
                <strong>SEL 4</strong>
              </th>
              <th>
                <strong>SEL 5</strong>
              </th>
              <th>
                <strong>Comments</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.trackers.filter(studentz => studentz.students.id === this.props.student.id).map((tracker) => (
              <tr>
                <th key={tracker.id}>{tracker?.date}</th>
                <td>
                  <small>{tracker?.attendance}</small>
                </td>
                <td>
                  <small>{tracker?.lesson}</small>
                </td>
                <td>
                  <small>{tracker?.comprehension}</small>
                </td>
                <td>
                  <small>{tracker?.engagement}</small>
                </td>
                <td>
                  <small>{tracker?.behavior}</small>
                </td>
                <td>
                  <small>{tracker?.assessment}</small>
                </td>
                <td>
                  <small>{tracker?.SEL1}</small>
                </td>
                <td>
                  <small>{tracker?.SEL2}</small>
                </td>
                <td>
                  <small>{tracker?.SEL3}</small>
                </td>
                <td>
                  <small>{tracker?.SEL4}</small>
                </td>
                <td>
                  <small>{tracker?.SEL5}</small>
                </td>
                <td>
                  <small>{tracker?.comprehensionComment} {tracker?.engagementComment} {tracker?.behaviorComment}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
