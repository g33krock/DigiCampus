import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { TrackerCreator } from "./CreateTracker";
import { Table, NavLink } from "reactstrap";
import { fetcher } from '../services/fetcher';



export default class AltStudentSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = { studentschedule: [], studentsched: []};
  }

  componentDidMount() {
    fetcher(`${baseURL}/schedules`) //Fetch StudentSchedule Table from API
      .then((response) => response.json()) //Convert response to a JSON object
      .then((data) => {
        this.setState({
          studentschedule: data,                   //Create relationship between studentschedule state array and JSON object
        });
      });
  }

  setSchedule(studentsched) {
    this.setState({studentsched: studentsched})
        
  }


  render() {
    const student = this.props.student;
    const schedBox = this.state.studentschedule
      .filter(studentschedule => studentschedule.student?.id === student.id)
      .sort((a, b) => (a.student?.firstName > b.student?.firstName) ? 1 : (a.student?.firstName === b.student?.firstName) ? ((a.period > b.period) ? 1 : -1) : -1)
      .map(studentsched => {
        let block;
        switch (studentsched.period){
          case 1:
            block = "7:50 - 8:40";
            break;
          case 2:
            block = "8:40 - 9:30";
            break;
          case 3:
            block = "9:30 - 10:20";
            break;
          case 4:
            block = "10:20 - 11:10";
            break;
          case 5:
            block = "11:10 - 12:00";
            break;
          case 6:
            block = "12:00 - 12:50";
            break;
          case 7:
            block = "12:50 - 1:40";
            break;
          case 8:
            block = "1:40 - 2:30";
            break;
          case 9:
            block = "2:30 - 3:20";
            break;
          case 10:
            block = "3:20 - 4:10";
            break;
            default:
            block= "dance party"
        }   
        return (
            <Table key={studentsched.id}>
                <thead>
                    <tr>
                        <th>Period {block}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id={`${studentsched.teacher?.firstName}`}>
                          <strong>Teacher:</strong> <p style={{fontSize: 'small'}}>{studentsched.teacher?.firstName} {studentsched.teacher?.lastName}</p> 
                          <strong>Course:</strong> <p style={{fontSize: 'small'}}>{studentsched.course?.name}</p>
                          <NavLink href={studentsched.teacher?.link}>Virtual</NavLink>
                          <TrackerCreator
                            student={studentsched.student}
                            teacher={studentsched.teacher}
                            course={studentsched.course}
                            period={studentsched.period}
                          ></TrackerCreator>
                          </td>
                    </tr>
                </tbody>
            </Table>
        )
      });

      return (
        <div id="schedBox" >
        
          StudentSchedule for {student.firstName} {student.lastName}
          <div className = "schedule-container">
            {schedBox}
          </div>
          
        </div>
    )
  }

}
