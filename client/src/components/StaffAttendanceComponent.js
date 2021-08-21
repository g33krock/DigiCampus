import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { Table } from "reactstrap";
import { fetcher } from '../services/fetcher';

export default class StaffAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = { staffAttendance: [], schedule: null, students: [], student: null };
  }

  componentDidMount() {
    this.getStaffAttendance()
  }

  getStaffAttendance() {
    fetcher(`${baseURL}/staffAttendance`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((attendances) => {
          attendances.sort((attendancea, attendanceb) => attendancea?.date-attendanceb?.date)
        this.setState({
            staffAttendance: attendances,
        })
        console.log(this.state.staffAttendance)
      });
  }

  setTracker(attendances) {
    // sets student property to student object.  This looks funny because they both are named student
    this.setState({ staffAttendance: attendances });
    console.log(attendances);
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
                <strong>Approved</strong>
              </th>
              <th>
                <strong>Illness</strong>
              </th>
              <th>
                <strong>Hours</strong>
              </th>
              <th>
                <strong>Points</strong>
              </th>
              <th>
                <strong>Comment</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.staffAttendance
            .filter(teacherz => teacherz.teachers?.id === this.props.teacher.id)
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
            .map((attendance) => (
              <tr>
                <th key={attendance.id}>{attendance?.date}</th>
                <td>
                  <small>{attendance?.approved}</small>
                </td>
                <td>
                  <small>{attendance?.illness}</small>
                </td>
                <td>
                  <small>{attendance?.hours}</small>
                </td>
                <td>
                  <small>{attendance?.points}</small>
                </td>
                <td>
                  <small>{attendance?.comment}</small>
                </td>
               </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
