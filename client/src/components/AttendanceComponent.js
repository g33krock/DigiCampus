import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { Table, Button } from "reactstrap";
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
    fetcher(`${baseURL}/studenttrackers?studentsId=${this.props.student.id}`)
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
    this.setState({ trackers: trackers });
    console.log(trackers);
  }


  render() {
    return (
      <div class="tableFixHead">
                <Button
        onClick={() => {
          this.getSchedules()
        }}>Update</Button>
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
            {this.state.trackers
            .filter(studentz => studentz.students?.id === this.props.student.id)
            .sort(function (a, b) {
              let x = a?.date;
              let y = b?.date;
              if (x < y) {
                return -1;
              }
              if (x > y) {
                return 1;
              }
              return 0;
            })
            // .sort((a, b) => a?.date - b?.date)
            .map((tracker) => (
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
