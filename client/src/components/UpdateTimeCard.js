import { Component } from "react";
import { Button } from "reactstrap";
import { teacherService } from "../services/teacherService";
import { timecardService } from "../services/timecardService";

var today = new Date();
var day = today.getFullYear().toString() +
"-" +
(today.getMonth() + 1).toString().padStart(2, 0) +
"-" +
today.getDate().toString().padStart(2, 0);
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

export class UpdateTimeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      here: null,
      teachers: [],
      teacher: null,
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

  async stampIn() {
    const timecardObject = {
      date: day,
      time: time,
      inOut: "In",
      teacher: this.props.teacher.id,
    };
    await timecardService.create(timecardObject);
  }

  async stampOut() {
    const timecardObject = {
      date: day,
      time: time,
      inOut: "Out",
      teacher: this.props.teacher.id,
    };
    await timecardService.create(timecardObject);
  }

  render() {
    const isHere = () => {
      if (this.props.teacher.here === "true") {
        return "Out";
      } else {
        return "In";
      }
    };
    return (
      <Button
        size="sm"
        onClick={
          (() => {
            if (this.props.teacher.here === "true") {
              return this.clockOut();
            } else {
              return this.clockIn();
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
