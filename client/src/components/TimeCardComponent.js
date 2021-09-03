import { Component } from "react";
import { Card, CardTitle, CardBody, Col, Container, Row } from "reactstrap";
import { baseURL } from "../baseURL";
import { fetcher } from "../services/fetcher";
import { teacherService } from "../services/teacherService";
import { UpdateTimeCard } from "./UpdateTimeCard";

export class TimeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
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
                    <UpdateTimeCard
                      callback={() => this.loadTeachers()}
                      teacher={teacher}
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
