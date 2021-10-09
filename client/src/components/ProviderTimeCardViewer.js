import { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  Col,
  Container,
  Row,
  Button,
} from "reactstrap";
import { baseURL } from "../baseURL";
import { fetcher } from "../services/fetcher";
import { SessionInfoCreator } from "./CreateSessionInfo";

var today = new Date();

var day =
  today.getFullYear().toString() +
  "-" +
  (today.getMonth() + 1).toString().padStart(2, 0) +
  "-" +
  today.getDate().toString().padStart(2, 0);

export class ProviderTimeCardViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherId: this.props.teacher.id,
      teachers: [],
      students: [],
      timecards: [],
      stimecards: [],
    };
  }

  componentDidMount() {
    this.loadTeachers();
    this.loadStudents();
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
          timecards: data.filter((now) => now?.date === day),
        });
      });
  }

  loadStudents() {
    fetcher(`${baseURL}/students`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          students: data,
        });
        console.log(this.state.students);
        console.log(this.props.teacher);
        console.log(this.state.teacherId);
      });
    fetcher(`${baseURL}/stimecards`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          stimecards: data.filter((now) => now?.date === day),
        });
      });
  }

  render() {
    return (
      <Container>
        <Button
          color="primary"
          onClick={() => {
            this.loadTeachers();
            this.loadStudents();
          }}
        >
          Refresh
        </Button>
        <Row>
          {this.state.students
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
            .map((stud) =>
              stud.relatedService
                .filter(
                  (service) => service.teacher.id === this.state.teacherId
                )
                .map((student) => (
                  <Col>
                    <Card className={stud.here}>
                      <CardTitle>
                        {stud.firstName} {stud.lastName}
                      </CardTitle>
                      <CardBody>
                        <SessionInfoCreator
                          studentId={stud.id}
                          teacherId={this.state.teacherId}
                          relatedServiceRoleId={student.relatedServiceRole?.id}
                          today={day}
                          studentName={stud.firstName}
                          relatedServiceRoleType={student.relatedServiceRole?.type}
                        />
                        {this.state.stimecards
                          .filter((card) => card.student.id === stud.id)
                          .map((punch) => (
                            <div>
                              <small>
                                {punch?.inOut}: {punch?.time}
                              </small>
                            </div>
                          ))}
                      </CardBody>
                    </Card>
                  </Col>
                ))
            )}
          ;
        </Row>
      </Container>
    );
  }
}
