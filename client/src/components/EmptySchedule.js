import { Component } from "react";
import {
  Button,
} from "reactstrap";
import { scheduleService } from "../services/scheduleService";

export class EmptyScheduleCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStatus: this.props.schedLength
    };
  }

  componentDidMount(){
    console.log(this.state.buttonStatus)
  }

  async emptySchedule() {
    for(let i=1; i < 11; i++) {
    const scheduleObject = {
      student: this.props.studentId,
      period:i, 
      teacher: 26, 
      course: 15, 
      campus: this.props.campusId
      
    };
    console.log(scheduleObject.student)
    
    const schedule = await scheduleService.create(scheduleObject);
    console.log(schedule)}
    this.setState({buttonStatus: 1})
    console.log(this.state.buttonStatus)
  }

  render() {
    if(this.state.buttonStatus >= 1){
      return (
        <div>
          <Button outline color="primary" size="sm" disabled={true}>
            Add Schedule
          </Button>
      </div>
      )
    } else {
      return (
        <div>
          <Button outline color="primary" size="sm" onClick={() => this.emptySchedule()}>
            Add Schedule
          </Button>
      </div>
      )
    }
}
}