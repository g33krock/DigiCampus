import React, { Component } from 'react';
import { Card, CardText, CardTitle } from "reactstrap";
import { fetcher } from "../services/fetcher";
import { baseURL } from "../baseURL";

export class ProgressReport extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            schedule: [],
            gradebooks: []
        }
    }

    componentDidMount() {
        fetcher(`${baseURL}/studentschedule?studentId=${this.props.student.id}`)
      .then((response) => response.json())
      .then((schedule) => {
        schedule
        this.setState({
          schedule,
        });
      });
      fetcher(`${baseURL}/studentgradebooks?studentsId=${this.props.student.id}`)
      .then((response) => response.json())
      .then((schedule) => {
        schedule
        this.setState({
          gradebooks,
        });
      });
    }

    render() {
        return(
            <Container></Container>
        )
    }
}