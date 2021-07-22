import React, { Component } from "react";
import {baseURL} from "../baseURL";
import { Container } from "reactstrap";
import {TeacherUpdater} from "./UpdateTeacher";
import TeacherSchedule from "./TeacherScheduleComponent";
import { fetcher } from "../services/fetcher";


export default class SingleTeacher extends Component {
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
      })
      .then(() => {
        this.setState({
        teacher: this.state.teachers.find(teacher => teacher.email === this.props?.userEmail)
    });
})
    console.log(this.props?.userEmail)
  }

  
  render() {
    return (
      <Container>
        <h1 className="perfectdark">Hello {this.state.teacher?.firstName}</h1>
        <TeacherUpdater
        teacherId={this.state.teacher?.id}
        teacherFirstName={this.state.teacher?.firstName}
        teacherLastName={this.state.teacher?.lastName}
        teacherBirthDate={this.state.teacher?.teacherBirthDate}
        teacherRole={this.state.teacher?.role}
        teacherCampus={this.state.teacher?.campus}
        teacherEmail={this.state.teacher?.email}
        teacherPhone={this.state.teacher?.phone}
        teacherLink={this.state.teacher?.link}
        teacherElementary={this.state.teacher?.elementary}
        teacherMiddle={this.state.teacher?.middle}
        teacherHighschoolMath={this.state.teacher?.math}
        teacherHighschoolELA={this.state.teacher?.ELA}
        teacherHighschoolHistory={this.state.teacher?.history}
        teacherHighschoolScience={this.state.teacher?.science}
        teacherElective={this.state.teacher?.elective}
        teacherP1={this.state.teacher?.pOne}
        teacherP2={this.state.teacher?.pTwo}
        teacherP3={this.state.teacher?.pThree}
        teacherP4={this.state.teacher?.pFour}
        teacherP5={this.state.teacher?.pFive}
        teacherP6={this.state.teacher?.pSix}
        teacherP7={this.state.teacher?.pSeven}
        teacherP8={this.state.teacher?.pEight}
        teacherP9={this.state.teacher?.pNine}
        teacherP10={this.state.teacher?.pTen}
        ></TeacherUpdater>
        {this.state.teacher && <TeacherSchedule teacher={this.state.teacher}></TeacherSchedule>}
      </Container>
    );
  }
}
