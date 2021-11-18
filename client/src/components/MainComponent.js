import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchTeachers } from '../store/teachers';
import Student from "./StudentComponent";
import AdminStudent from "./AdminStudentComponent";
import Sub from "./SubComponent";
import Home from "./HomeComponent";
import { Switch, Redirect } from "react-router-dom";
import Teacher from "./TeacherComponent";
import AdminTeacher from "./AdminTeacherComponent";
import SingleTeacher from "./SingleTeacherComponent";
import Schedule from "./ScheduleComponent";
import AdminSchedule from "./AdminScheduleComponent";
import { PrivateRoute } from "./PrivateRoute";
import Sped from "./SpedComponent";
import Transcript from "./TranscriptComponent";
import Calendar from "./CalendarComponent";
import { teacherService } from "../services/teacherService";
import Announcement from "./AnnouncementComponent";
import Resource from "./ResourceComponent";
import { TimeCard } from "./TimeCardComponent";
import Billing from "./BillingComponent";
import { ProviderTimeCardViewer } from "./ProviderTimeCardViewer";
import { AdminProviderTimeCardViewer } from "./AdminProviderTimeCardViewer";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: null,
      loading: true,
    };
  }

  async componentDidMount() {
    await this.props.loadTeachers();
    this.setState({ loading: false });
  }

  render() {
    const { teachers } = this.props;
    const { loading } = this.state;

    if (loading) {
      console.log("LOADING: ");
      return (
        <div>loading... please wait!</div>
      )
    }

    console.log("DONE LOADING: ", this.props);
    console.log("TEACHERS -->", teachers);

    const teacher = teachers.find(
      (teacher) => teacher.email === this.props.userEmail
    );

    const campus = teacher.campus;

    console.log("about to set state...");

    console.log("state set");

    if (
      teacher?.role.id === 3 ||
      teacher?.role.id === 4
    ) {
      return (
        <div>
          <Switch>
            <PrivateRoute
              path="/singleteachers"
              component={SingleTeacher}
              userEmail={this.props?.appuserEmail}
            />
            <PrivateRoute
              path="/calendar"
              component={Calendar}
              userEmail={this.props?.userEmail}
            />
            <PrivateRoute
              path="/substitute"
              component={Sub}
              userEmail={this.props?.userEmail}
              campus={campus}
              teacher={teacher}
            />
            <PrivateRoute
              path="/resources"
              component={Resource}
              userEmail={this.props?.userEmail}
            />
            <PrivateRoute path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        </div>
      );
    } else if (teacher?.role.id === 8) {
      return (
        <PrivateRoute
          path="/providerTimeCardViewer"
          component={ProviderTimeCardViewer}
          userEmail={this.props?.userEmail}
          teacher={teacher}
        />
      );
    } else if (teacher?.role.id === 12) {
      return (
        <PrivateRoute
          path="/adminProviderTimeCardViewer"
          component={AdminProviderTimeCardViewer}
          userEmail={this.props?.userEmail}
          teacher={teacher}
        />
      );
    } else if (
      teacher?.role.id === 1 ||
      teacher?.role.id === 2 ||
      teacher?.role.id === 11
    ) {
      return (
        <div>
          <Switch>
            <PrivateRoute
              path="/sped"
              component={Sped}
              campus={campus}
            />
            <PrivateRoute
              path="/schedules"
              component={Schedule}
              campus={campus}
            />
            <PrivateRoute
              path="/teachers"
              component={Teacher}
              campus={campus}
            />
            <PrivateRoute
              path="/students"
              component={Student}
              campus={campus}
              teacher={teacher}
            />
            <PrivateRoute
              path="/transcripts"
              component={Transcript}
              campus={campus}
            />
            <PrivateRoute
              path="/announcements"
              component={Announcement}
              campus={campus}
            />
            <PrivateRoute
              path="/substitute"
              component={Sub}
              userEmail={this.props?.userEmail}
              campus={campus}
              teacher={teacher}
            />
            <PrivateRoute
              path="/calendar"
              component={Calendar}
              userEmail={this.props?.userEmail}
            />
            <PrivateRoute
              path="/resources"
              component={Resource}
              userEmail={this.props?.userEmail}
            />
            <PrivateRoute
              path="/timeCard"
              component={TimeCard}
              userEmail={this.props?.userEmail}
              campus={campus}
            />
            <PrivateRoute path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        </div>
      );
    } else if (
      teacher?.role.id === 5 ||
      teacher?.role.id === 7
    ) {
      return (
        <div>
          <Switch>
            <PrivateRoute
              path="/sped"
              component={Sped}
              campus={campus}
            />
            <PrivateRoute
              path="/schedules"
              component={Schedule}
              campus={campus}
            />
            <PrivateRoute
              path="/adminSchedules"
              component={AdminSchedule}
              campus={campus}
            />
            <PrivateRoute
              path="/adminTeachers"
              component={AdminTeacher}
              campus={campus}
            />
            <PrivateRoute
              path="/adminStudents"
              component={AdminStudent}
              campus={campus}
              teacher={teacher}
            />
            <PrivateRoute
              path="/transcripts"
              component={Transcript}
              campus={campus}
            />
            <PrivateRoute
              path="/announcements"
              component={Announcement}
              campus={campus}
            />
            <PrivateRoute
              path="/substitute"
              component={Sub}
              userEmail={this.props?.userEmail}
              campus={campus}
              teacher={teacher}
            />
            <PrivateRoute
              path="/calendar"
              component={Calendar}
              userEmail={this.props?.userEmail}
            />
            <PrivateRoute
              path="/resources"
              component={Resource}
              userEmail={this.props?.userEmail}
            />
            <PrivateRoute
              path="/timeCard"
              component={TimeCard}
              userEmail={this.props?.userEmail}
              campus={campus}
            />
            <PrivateRoute path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        </div>
      );
    } else {
      return (
        <div>
          <Switch>
            <PrivateRoute
              path="/sped"
              component={Sped}
              campus={campus}
            />
            <PrivateRoute
              path="/schedules"
              component={Schedule}
              campus={campus}
            />
            <PrivateRoute
              path="/adminSchedules"
              component={AdminSchedule}
              campus={campus}
            />
            <PrivateRoute
              path="/teachers"
              component={Teacher}
              campus={campus}
            />
            <PrivateRoute
              path="/adminTeachers"
              component={AdminTeacher}
              campus={campus}
            />
            <PrivateRoute
              path="/students"
              component={Student}
              campus={campus}
              teacher={teacher}
            />
            <PrivateRoute
              path="/adminStudents"
              component={AdminStudent}
              campus={campus}
              teacher={teacher}
            />
            <PrivateRoute
              path="/transcripts"
              component={Transcript}
              campus={campus}
            />
            <PrivateRoute
              path="/announcements"
              component={Announcement}
              campus={campus}
            />
            <PrivateRoute
              path="/substitute"
              component={Sub}
              userEmail={this.props?.userEmail}
              campus={campus}
              teacher={teacher}
            />
            <PrivateRoute
              path="/calendar"
              component={Calendar}
              userEmail={this.props?.userEmail}
            />
            <PrivateRoute
              path="/resources"
              component={Resource}
              userEmail={this.props?.userEmail}
            />
            <PrivateRoute
              path="/timeCard"
              component={TimeCard}
              userEmail={this.props?.userEmail}
              campus={campus}
            />
            <PrivateRoute
              path="/billing"
              component={Billing}
              userEmail={this.props?.userEmail}
            />
            <PrivateRoute path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    teachers: state.teachers,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadTeachers: () => dispatch(fetchTeachers()),
  }
}

export default connect(mapState, mapDispatch)(Main);
