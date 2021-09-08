import { Component } from "react";
import { Button } from "reactstrap";
import { teacherService } from "../services/teacherService";
import { timecardService } from "../services/timecardService";



export class UpdateTimeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      here: null,
      teachers: [],
      teacher: null,
      time: null
    };
  }

  async clockIn() {
    const teacherObject = {
      here: "true",
      teacherID: this.props.teacher.id,
    };
    await teacherService.update(teacherObject);
    await this.stampIn();
    setTimeout(() => {
      this.props.callback();
    }, 1000);
  }

  async clockOut() {
    const teacherObject = {
      here: "false",
      teacherID: this.props.teacher.id,
    };
    await teacherService.update(teacherObject);
    await this.stampOut();
    setTimeout(() => {
      this.props.callback();
    }, 1000);
  }

  async stampIn(time, day) {
    let today = new Date();
    const timecardObject = {
      date: today.getFullYear().toString() +
      "-" +
      (today.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      today.getDate().toString().padStart(2, 0),
      time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      inOut: "In",
      teacher: this.props.teacher.id,
    };
    await timecardService.create(timecardObject);
  }

  async stampOut(time, day) {
    let today = new Date();
    const timecardObject = {
      date: today.getFullYear().toString() +
      "-" +
      (today.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      today.getDate().toString().padStart(2, 0),
      time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      inOut: "Out",
      teacher: this.props.teacher.id,
    };
    await timecardService.create(timecardObject);
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
            
            if (this.props.teacher.here === "true") {
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
