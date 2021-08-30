import React, { Component } from "react";
import { Label, Input, Form, Button, Container, Col } from "reactstrap";




export default class DateRangeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: null, endDate: null};
  }

  async saveTheDate() {
      const date = await this.setState({ startDate: document.getElementById("startDate").value, endDate: document.getElementById("endDate").value });
      console.log(date)
      console.log(`Start: ${this.state.startDate}  End: ${this.state.endDate}`)
  }

  render(){
      return(
          <Form>
              <Container>

                  <Col md="4">
        <Label for="startDate">Start Date</Label>
        <Input
          type="date"
          name="startDate"
          id="startDate"
          placeholder="Start"
        />
        </Col>
        <Col md="4">
        <Label for="endDate">End Date</Label>
        <Input
          type="date"
          name="endDate"
          id="endDate"
          placeholder="End"
        />
        </Col>
                      <Button
                color="link"
                onClick={() => {
                    this.saveTheDate()
                }}
              >
                Submit
              </Button>
              </Container>
          </Form>
      )
  }
}