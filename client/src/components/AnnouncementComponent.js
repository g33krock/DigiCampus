import React, { Component } from "react";
import { baseURL } from "../baseURL";
import { Card, CardTitle, CardBody, Container} from "reactstrap";
import { fetcher } from "../services/fetcher";

export default class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = { announcements: [] };
  }

  componentDidMount() {
    fetcher(`${baseURL}/announcements`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          announcements: data,
        });
      });
      console.log(this.state.announcements)
  }

  render() {
      return(
          <Container>
              {
      this.state.announcements?.map((announcement) => {
        <Card>
            <CardTitle>{announcement.head}</CardTitle>
            <br />
            <CardBody>{announcement.body}</CardBody>
        </Card>;
      })
    }
          </Container>
      )
  }
}
