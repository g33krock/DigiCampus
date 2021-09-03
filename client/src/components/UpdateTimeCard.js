import { Component } from "react";
import { Button } from "reactstrap";
import { teacherService } from "../services/teacherService";

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
    await this.props.callback();
  }

  async clockOut() {
    const teacherObject = {
      here: "false",
      teacherID: this.props.teacher.id,
    };
    await teacherService.update(teacherObject);
    await this.props.callback();
  }

  render() {
      const isHere = () => {
        if (this.props.teacher.here === "true") {
          return "Clock Out";
        } else {
          return "Clock In";
        }
      }
    return (
      <Button
        size="sm"
        onClick={() => {
          if (this.props.teacher.here === "true") {
            return this.clockOut();
          } else {
            return this.clockIn();
          }
        }}
      >
          Punch Clock
      </Button>
    );
  }
}
