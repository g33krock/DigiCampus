import { Component } from "react";
import { Card, CardTitle, CardBody, Col, Container, Row, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { baseURL } from "../baseURL";
import { fetcher } from "../services/fetcher";
import { UpdateStudentTimeCard } from "./UpdateStudentTimeCard";
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
      activeTab: "1",
    };
    this.state = {
      teachers: [],
      students: [],
      timecards: [],
      stimecards: []
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
          timecards: data.filter(now => now?.date === day),
        })
      });
  }

  loadStudents() {
    fetcher(`${baseURL}/students`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          students: data,
        });
      });
      fetcher(`${baseURL}/stimecards`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          stimecards: data.filter(now => now?.date === day),
        })
      });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <Container>
                <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Teachers
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Students
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
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
        </TabPane>
        <TabPane tabId="2">
        <Row>
          {this.state.students
            .filter((student) => student?.campuses.id === this.props?.campus.id)
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
            .map((student) => (
              <Col>
                <Card className={student.here}>
                  <CardTitle>
                    {student.firstName} {student.lastName}
                  </CardTitle>
                  <CardBody>
                    {this.state.stimecards.filter(card => card.student.id === student.id)
                    .map(punch => <div><small>{punch?.inOut}: {punch?.time}</small></div>)}
                    <UpdateStudentTimeCard
                      callback={() => this.loadStudents()}
                      student={student}
                      here={student.here}
                    />
                  </CardBody>
                </Card>
              </Col>
            ))}
          ;
        </Row>
        </TabPane>
        </TabContent>
      </Container>
    );
  }
}
