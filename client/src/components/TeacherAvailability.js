// import { supabase } from "../../utils/supabaseClient";
import React, { Component } from "react";
import { teacherService } from "../services/teacherService";

export default class TeacherAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        teachers: [], 
        pOne: [], 
        pTwo: [], 
        pThree: [], 
        pFour: [], 
        pFive: [], 
        pSix: [], 
        pSeven: [], 
        pEight: [], 
        pNine: [], 
        pTen: [] };
  }

  componentDidMount() {
    const teachers = await teacherService.all(teacherObject);
    this.setState({teachers});
    const pOne = this.state.teachers.filter(teacher => teacher.pOne === yes);
    this.setState({pOne})
    const pTwo = this.state.teachers.filter(teacher => teacher.pTwo === yes);
    this.setState({pTwo})
    const pThree = this.state.teachers.filter(teacher => teacher.pThree === yes);
    this.setState({pThree})
    const pFour = this.state.teachers.filter(teacher => teacher.pFour === yes);
    this.setState({pFour})
    const pFive = this.state.teachers.filter(teacher => teacher.pFive === yes);
    this.setState({pFive})
    const pSix = this.state.teachers.filter(teacher => teacher.pSix === yes);
    this.setState({pSix})
    const pSeven = this.state.teachers.filter(teacher => teacher.pSeven === yes);
    this.setState({pSeven})
    const pEight = this.state.teachers.filter(teacher => teacher.pEight === yes);
    this.setState({pEight})
    const pNine = this.state.teachers.filter(teacher => teacher.pNine === yes);
    this.setState({pNine})
    const pTen = this.state.teachers.filter(teacher => teacher.pTen === yes);
    this.setState({pTen})
  }

  render() {
    return (
        <h1></h1>
    );
  }
}
