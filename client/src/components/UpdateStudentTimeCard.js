import { Component } from "react";
import { Button } from "reactstrap";
import { studentService } from "../services/studentService";
import { studentTimeCardService } from "../services/studentTimecardService";



export class UpdateStudentTimeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      here: null,
      students: [],
      student: null,
      time: null
    };
  }

  async clockIn() {
    const studentObject = {
      here: "true",
      studentID: this.props.student.id,
    };
    await studentService.update(studentObject);
    await this.stampIn();
    setTimeout(() => {
      this.props.callback();
    }, 1000);
  }

  async clockOut() {
    const studentObject = {
      here: "false",
      studentID: this.props.student.id,
    };
    await studentService.update(studentObject);
    await this.stampOut();
    setTimeout(() => {
      this.props.callback();
    }, 1000);
  }

  async stampIn() {
    let today = new Date();
    const stimecardObject = {
      date: today.getFullYear().toString() +
      "-" +
      (today.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      today.getDate().toString().padStart(2, 0),
      time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      inOut: "In",
      student: this.props.student.id,
    };
    await studentTimeCardService.create(stimecardObject);
  }

  async stampOut() {
    let today = new Date();
    const stimecardObject = {
      date: today.getFullYear().toString() +
      "-" +
      (today.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      today.getDate().toString().padStart(2, 0),
      time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      inOut: "Out",
      student: this.props.student.id,
    };
    await studentTimeCardService.create(stimecardObject);
  }

  render() {
    let today = new Date();
    let day = today.getFullYear().toString() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    today.getDate().toString().padStart(2, 0);
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return (
      <Button
        size="sm"
        onClick={
          (() => {
            
            if (this.props.student.here === "true") {
              return this.clockOut(time, day);
            } else {
              return this.clockIn(time, day);
            }
          }
          )
        }
      >
        Punch Clock
      </Button>
    );
  }
}