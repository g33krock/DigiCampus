import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { Container, Label } from "reactstrap";
import TeacherSchedule from "./TeacherScheduleComponent";
import {TeacherCreator} from "./CreateTeacher";
import { fetcher } from "../services/fetcher";


export default class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = { teachers: [], teacher: null };
  }

  componentDidMount() {
    // Fetch Student Table from API
    fetcher(`${baseURL}/teachers`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          teachers: data,
        });
      });
  }

  onChange = e => {
    const teacherId = Number(e.target.value)
    const teacher = this.state.teachers.find(teacher => teacher.id === teacherId) 
    this.setState({ teacher });
    console.log(this.state)
    console.log(e.target.value)
  }
  
  render() {
    return (
      <Container>
        <TeacherCreator></TeacherCreator>
        <h1 className="perfectdark">Hello {this.state.teacher?.firstName}</h1>
        <div className = "row">
          <Label for="scheduleTeacher">Select Teacher</Label>
          <select id="scheduleTeacher" onChange={this.onChange}>
            <option selected>None</option>
            {this.state.teachers
            .sort(function (a, b){
              let x = a.firstName.toLowerCase();
              let y = b.firstName.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;})
            .map(teacher => 
              <option key={teacher.id} value={teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            )}
          </select>
        </div>
        {this.state.teacher && <TeacherSchedule teacher={this.state.teacher} userEmail={this.props?.userEmail}></TeacherSchedule>}
      </Container>
    );
  }
}
