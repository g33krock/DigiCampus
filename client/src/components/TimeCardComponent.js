import { Component } from "react";
import { Card, CardTitle, CardBody, Col, Container, Row } from "reactstrap";
import { baseURL } from "../baseURL";
import { fetcher } from "../services/fetcher";
import { UpdateTimeCard } from "./UpdateTimeCard";

var today = new Date();

var day = today.getFullYear().toString() +
"-" +
(today.getMonth() + 1).toString().padStart(2, 0) +
"-" +
today.getDate().toString().padStart(2, 0);

export class TimeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      timecards: []
    };
  }

  componentDidMount() {
    this.loadTeachers();
  }

  loadTeachers() {
    fetcher(`${baseURL}/teachers`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          teachers: data,
        });
      });
      fetcher(`${baseURL}/timecards`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          timecards: data.filter(now => now?.date === day),
        })
      });
  }

  // toggle() {
  //   return !this.state.here;
  // }

  // async punchCard() {
  //   this.setState({ here: (() => {if (this.state.here === "false"){
  //       return "true"
  //   }else{
  //       return "false"
  //   }
  //   })})
  //   await this.updateTeacher()
  // }

  render() {
    return (
      <Container>
        <Row>
          {this.state.teachers
            .filter((teacher) => teacher.campus.id === this.props?.campus.id)
            .sort(function (a, b) {
              let x = a.firstName.toLowerCase();
              let y = b.firstName.toLowerCase();
              if (x < y) {
                return -1;
              }
              if (x > y) {
                return 1;
              }
              return 0;
            })
            .map((teacher) => (
              <Col>
                <Card className={teacher.here}>
                  <CardTitle>
                    {teacher.firstName} {teacher.lastName}
                  </CardTitle>
                  <CardBody>
                    {this.state.timecards.filter(card => card.teacher.id === teacher.id)
                    .map(punch => <div><small>{punch?.inOut}: {punch?.time}</small></div>)}
                    <UpdateTimeCard
                      callback={() => this.loadTeachers()}
                      teacher={teacher}
                      here={teacher.here}
                    />
                  </CardBody>
                </Card>
              </Col>
            ))}
          ;
        </Row>
      </Container>
    );
  }
}
