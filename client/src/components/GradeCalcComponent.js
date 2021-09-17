import { Component } from "react";

export class GradeCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
      console.log(this.props.gradebook)
    return (
        // this.props.gradebook.map(grade => 
        //     <p>{grade.pointsAvailable}</p>)
        <h3>{((this.props.gradebook.reduce((a, b) => a + b.pointsEarned, 0))/(this.props.gradebook.reduce((a, b) => a + b.pointsAvailable, 0))*100).toFixed(2)}%</h3>
    )
  }
}
