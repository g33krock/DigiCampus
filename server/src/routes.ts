import { UserController } from "./controller/UserController";
import { StudentController } from "./controller/StudentController";
import { ScheduleController } from "./controller/ScheduleController";
import { CampusController } from "./controller/CampusController";
import { GuardianController } from "./controller/GuardianController";
import { RoleController } from "./controller/RoleController";
import { School_AdminController } from "./controller/School_AdminController";
import { TeacherController } from "./controller/TeacherController";
import { TrackerController } from "./controller/TrackerController";
import { CourseController } from "./controller/CourseController";
import { GradebookController } from "./controller/GradebookController";
import { FundingController } from "./controller/FundingController";
import { InstructionModeController } from "./controller/InstructionModeController";
import { SpedQuestionController } from "./controller/SpedQuestionController";
import { SpedResponseController } from "./controller/SpedResponseController";
import { TranscriptController } from "./controller/TranscriptController";
import { AnnouncementController } from "./controller/AnnouncementController";
import { IncidentController } from "./controller/IncidentController";
import { StaffAttendanceController } from "./controller/StaffAttendanceController";
import { TimeCardController } from "./controller/TimeCardController";
import { TeacherTimeCardController } from "./controller/TeacherTimeCardController";
import { StudentTimeCardController } from "./controller/StudentTimeCardController";
import { StudentGradebookController } from "./controller/StudentGradebookController";
import { StudentScheduleController } from "./controller/StudentScheduleController";
import { StudentTrackerController } from "./controller/StudentTrackerController";
import { DistrictController } from "./controller/DistrictController";
import { StudentTranscriptController } from "./controller/StudentTranscriptController";
import { SchoolDayController } from "./controller/SchoolDayController";
import { AttendanceController } from "./controller/AttendanceController";
import { RelatedServiceController } from "./controller/RelatedServiceController";
import { RelatedServiceRoleController } from "./controller/RelatedServiceRoleController";
import { SessionInfoController } from "./controller/SessionInfoController";
import { TallyQuestionController } from "./controller/TallyQuestionController";
import { TallyResponseController } from "./controller/TallyResponseController";
import { StudentAttendanceController } from "./controller/StudentAttendanceController";

export const Routes = [{
	method: "get",
	route: "/users",
	controller: UserController,
	action: "all"
}, {
	method: "get",
	route: "/users/:id",
	controller: UserController,
	action: "one"
}, {
	method: "post",
	route: "/users",
	controller: UserController,
	action: "save"
}, {
	method: "delete",
	route: "/users/:id",
	controller: UserController,
	action: "remove"
},
// Student
{
	method: "get",
	route: "/students",
	controller: StudentController,
	action: "all"
},
{
	method: "get",
	route: "/students/:id",
	controller: StudentController,
	action: "one"
},
{
	method: "put",
	route: "/students/:id",
	controller: StudentController,
	action: "update"
}, {
	method: "post",
	route: "/students",
	controller: StudentController,
	action: "save"
}, {
	method: "delete",
	route: "/students/:id",
	controller: StudentController,
	action: "remove"
},{
	method: "get",
	route: "/students/:id/schedules",
	controller: StudentController,
	action: "loadStudentSchedules"
},

// Schedule
{
	method: "get",
	route: "/schedules",
	controller: ScheduleController,
	action: "all"
},{
	method: "get",
	route: "/studentschedules?:studentId",
	controller: StudentScheduleController,
	action: "all"
}, {
	method: "get",
	route: "/schedules/:id",
	controller: ScheduleController,
	action: "one"
}, {
	method: "put",
	route: "/schedules/:id",
	controller: ScheduleController,
	action: "update"
}, {
	method: "post",
	route: "/schedules",
	controller: ScheduleController,
	action: "save"
}, {
	method: "delete",
	route: "/schedules/:id",
	controller: ScheduleController,
	action: "remove"
},

// Campus
{
	method: "get",
	route: "/campuses",
	controller: CampusController,
	action: "all"
}, {
	method: "get",
	route: "/campuses/:id",
	controller: CampusController,
	action: "one"
}, {
	method: "put",
	route: "/campuses/:id",
	controller: CampusController,
	action: "update"
}, {
	method: "post",
	route: "/campuses",
	controller: CampusController,
	action: "save"
}, {
	method: "delete",
	route: "/campuses/:id",
	controller: CampusController,
	action: "remove"
},

// Guardian
{
	method: "get",
	route: "/guardians",
	controller: GuardianController,
	action: "all"
}, {
	method: "get",
	route: "/guardians/:id",
	controller: GuardianController,
	action: "one"
}, {
	method: "put",
	route: "/guardians/:id",
	controller: GuardianController,
	action: "update"
}, {
	method: "post",
	route: "/guardians",
	controller: GuardianController,
	action: "save"
}, {
	method: "delete",
	route: "/guardians/:id",
	controller: GuardianController,
	action: "remove"
},

// District
{
	method: "get",
	route: "/districts",
	controller: DistrictController,
	action: "all"
}, {
	method: "get",
	route: "/districts/:id",
	controller: DistrictController,
	action: "one"
}, {
	method: "put",
	route: "/districts/:id",
	controller: DistrictController,
	action: "update"
}, {
	method: "post",
	route: "/districts",
	controller: DistrictController,
	action: "save"
}, {
	method: "delete",
	route: "/districts/:id",
	controller: DistrictController,
	action: "remove"
},

// Role
{
	method: "get",
	route: "/roles",
	controller: RoleController,
	action: "all"
}, {
	method: "get",
	route: "/roles/:id",
	controller: RoleController,
	action: "one"
}, {
	method: "put",
	route: "/roles/:id",
	controller: RoleController,
	action: "update"
}, {
	method: "post",
	route: "/roles",
	controller: RoleController,
	action: "save"
}, {
	method: "delete",
	route: "/roles/:id",
	controller: RoleController,
	action: "remove"
},

// School_Admin
{
	method: "get",
	route: "/school_admins",
	controller: School_AdminController,
	action: "all"
}, {
	method: "get",
	route: "/school_admins/:id",
	controller: School_AdminController,
	action: "one"
}, {
	method: "put",
	route: "/school_admins/:id",
	controller: School_AdminController,
	action: "update"
}, {
	method: "post",
	route: "/school_admins",
	controller: School_AdminController,
	action: "save"
}, {
	method: "delete",
	route: "/school_admins/:id",
	controller: School_AdminController,
	action: "remove"
},

// Teacher
{
	method: "get",
	route: "/teachers",
	controller: TeacherController,
	action: "all"
}, {
	method: "get",
	route: "/teachers/:id",
	controller: TeacherController,
	action: "one"
}, {
	method: "put",
	route: "/teachers/:id",
	controller: TeacherController,
	action: "update"
}, {
	method: "post",
	route: "/teachers",
	controller: TeacherController,
	action: "save"
}, {
	method: "delete",
	route: "/teachers/:id",
	controller: TeacherController,
	action: "remove"
}, {
	method: "get",
	route: "/teachers/:id/schedules",
	controller: TeacherController,
	action: "loadTeacherSchedules"
},
// Tracker
{
	method: "get",
	route: "/trackers?:teachersId",
	controller: TrackerController,
	action: "all"
},{
	method: "get",
	route: "/studenttrackers?:studentsId",
	controller: StudentTrackerController,
	action: "all"
}, {
	method: "get",
	route: "/trackers/:id",
	controller: TrackerController,
	action: "one"
}, {
	method: "put",
	route: "/trackers/:id",
	controller: TrackerController,
	action: "update"
}, {
	method: "post",
	route: "/trackers",
	controller: TrackerController,
	action: "save"
}, {
	method: "delete",
	route: "/trackers/:id",
	controller: TrackerController,
	action: "remove"
},

// Course
{
	method: "get",
	route: "/courses",
	controller: CourseController,
	action: "all"
}, {
	method: "get",
	route: "/courses/:id",
	controller: CourseController,
	action: "one"
}, {
	method: "put",
	route: "/courses/:id",
	controller: CourseController,
	action: "update"
}, {
	method: "post",
	route: "/courses",
	controller: CourseController,
	action: "save"
}, {
	method: "delete",
	route: "/courses/:id",
	controller: CourseController,
	action: "remove"
},
// Gradebooks
{
	method: "get",
	route: "/gradebooks",
	controller: GradebookController,
	action: "all"
},{
	method: "get",
	route: "/studentgradebook?:studentsId",
	controller: StudentGradebookController,
	action: "all"
}, {
	method: "get",
	route: "/gradebooks/:id",
	controller: GradebookController,
	action: "one"
}, {
	method: "put",
	route: "/gradebooks/:id",
	controller: GradebookController,
	action: "update"
}, {
	method: "post",
	route: "/gradebooks",
	controller: GradebookController,
	action: "save"
}, {
	method: "delete",
	route: "/gradebooks/:id",
	controller: GradebookController,
	action: "remove"
},
// Funding
{
	method: "get",
	route: "/funding",
	controller: FundingController,
	action: "all"
}, {
	method: "get",
	route: "/funding/:id",
	controller: FundingController,
	action: "one"
}, {
	method: "put",
	route: "/funding/:id",
	controller: FundingController,
	action: "update"
}, {
	method: "post",
	route: "/funding",
	controller: FundingController,
	action: "save"
}, {
	method: "delete",
	route: "/funding/:id",
	controller: FundingController,
	action: "remove"
},
// InstructionMode
{
	method: "get",
	route: "/instructionmode",
	controller: InstructionModeController,
	action: "all"
}, {
	method: "get",
	route: "/instructionmode/:id",
	controller: InstructionModeController,
	action: "one"
}, {
	method: "put",
	route: "/instructionmode/:id",
	controller: InstructionModeController,
	action: "update"
}, {
	method: "post",
	route: "/instructionmode",
	controller: InstructionModeController,
	action: "save"
}, {
	method: "delete",
	route: "/instructionmode/:id",
	controller: InstructionModeController,
	action: "remove"
},
// SpedQuestion
{
	method: "get",
	route: "/spedQuestions",
	controller: SpedQuestionController,
	action: "all"
}, {
	method: "get",
	route: "/spedQuestions/:id",
	controller: SpedQuestionController,
	action: "one"
}, {
	method: "put",
	route: "/spedQuestions/:id",
	controller: SpedQuestionController,
	action: "update"
}, {
	method: "post",
	route: "/spedQuestions",
	controller: SpedQuestionController,
	action: "save"
}, {
	method: "delete",
	route: "/spedQuestions/:id",
	controller: SpedQuestionController,
	action: "remove"
},
// SpedResponse
{
	method: "get",
	route: "/spedResponses?:studentsId",
	controller: SpedResponseController,
	action: "all"
}, {
	method: "get",
	route: "/spedResponses/:id",
	controller: SpedResponseController,
	action: "one"
}, {
	method: "put",
	route: "/spedResponses/:id",
	controller: SpedResponseController,
	action: "update"
}, {
	method: "post",
	route: "/spedResponses",
	controller: SpedResponseController,
	action: "save"
}, {
	method: "delete",
	route: "/spedResponses/:id",
	controller: SpedResponseController,
	action: "remove"
},

// TallyQuestion
{
	method: "get",
	route: "/tallyQuestions",
	controller: TallyQuestionController,
	action: "all"
}, {
	method: "get",
	route: "/tallyQuestions/:id",
	controller: TallyQuestionController,
	action: "one"
}, {
	method: "put",
	route: "/tallyQuestions/:id",
	controller: TallyQuestionController,
	action: "update"
}, {
	method: "post",
	route: "/tallyQuestions",
	controller: TallyQuestionController,
	action: "save"
}, {
	method: "delete",
	route: "/tallyQuestions/:id",
	controller: TallyQuestionController,
	action: "remove"
},
// TallyResponse
{
	method: "get",
	route: "/tallyResponses?:studentsId",
	controller: TallyResponseController,
	action: "all"
}, {
	method: "get",
	route: "/tallyResponses/:id",
	controller: TallyResponseController,
	action: "one"
}, {
	method: "put",
	route: "/tallyResponses/:id",
	controller: TallyResponseController,
	action: "update"
}, {
	method: "post",
	route: "/tallyResponses",
	controller: TallyResponseController,
	action: "save"
}, {
	method: "delete",
	route: "/tallyResponses/:id",
	controller: TallyResponseController,
	action: "remove"
},

// Transcript
{
    method: "get",
    route: "/transcripts",
    controller: TranscriptController,
    action: "all"
},{
	method: "get",
	route: "/studenttranscripts?:studentId",
	controller: StudentTranscriptController,
	action: "all"
}, {
    method: "get",
    route: "/transcripts/:id",
    controller: TranscriptController,
    action: "one"
}, {
    method: "put",
    route: "/transcripts/:id",
    controller: TranscriptController,
    action: "update"
}, {
    method: "post",
    route: "/transcripts",
    controller: TranscriptController,
    action: "save"
}, {
    method: "delete",
    route: "/transcripts/:id",
    controller: TranscriptController,
    action: "remove"
},

// Announcement
{
    method: "get",
    route: "/announcements",
    controller: AnnouncementController,
    action: "all"
}, {
    method: "get",
    route: "/announcements/:id",
    controller: AnnouncementController,
    action: "one"
}, {
    method: "put",
    route: "/announcements/:id",
    controller: AnnouncementController,
    action: "update"
}, {
    method: "post",
    route: "/announcements",
    controller: AnnouncementController,
    action: "save"
}, {
    method: "delete",
    route: "/announcements/:id",
    controller: AnnouncementController,
    action: "remove"
},

// Incident

{
    method: "get",
    route: "/incidents",
    controller: IncidentController,
    action: "all"
}, {
    method: "get",
    route: "/incidents/:id",
    controller: IncidentController,
    action: "one"
}, {
    method: "put",
    route: "/incidents/:id",
    controller: IncidentController,
    action: "update"
}, {
    method: "post",
    route: "/incidents",
    controller: IncidentController,
    action: "save"
}, {
    method: "delete",
    route: "/incidents/:id",
    controller: IncidentController,
    action: "remove"
},

// StaffAttendance

{
    method: "get",
    route: "/staffAttendance",
    controller: StaffAttendanceController,
    action: "all"
}, {
    method: "get",
    route: "/staffAttendance/:id",
    controller: StaffAttendanceController,
    action: "one"
}, {
    method: "put",
    route: "/staffAttendance/:id",
    controller: StaffAttendanceController,
    action: "update"
}, {
    method: "post",
    route: "/staffAttendance",
    controller: StaffAttendanceController,
    action: "save"
}, {
    method: "delete",
    route: "/staffAttendance/:id",
    controller: StaffAttendanceController,
    action: "remove"
},

// TimeCard

{
    method: "get",
    route: "/timecards",
    controller: TimeCardController,
    action: "all"
},{
	method: "get",
	route: "/ttimecards?:teacherId",
	controller: TeacherTimeCardController,
	action: "all"
}, {
    method: "get",
    route: "/timecards/:id",
    controller: TimeCardController,
    action: "one"
}, {
    method: "put",
    route: "/timecards/:id",
    controller: TimeCardController,
    action: "update"
}, {
    method: "post",
    route: "/timecards",
    controller: TimeCardController,
    action: "save"
}, {
    method: "delete",
    route: "/timecards/:id",
    controller: TimeCardController,
    action: "remove"
},

// StudentTimeCard

{
    method: "get",
    route: "/stimecards",
    controller: StudentTimeCardController,
    action: "all"
}, {
    method: "get",
    route: "/stimecards/:id",
    controller: StudentTimeCardController,
    action: "one"
}, {
    method: "put",
    route: "/stimecards/:id",
    controller: StudentTimeCardController,
    action: "update"
}, {
    method: "post",
    route: "/stimecards",
    controller: StudentTimeCardController,
    action: "save"
}, {
    method: "delete",
    route: "/stimecards/:id",
    controller: StudentTimeCardController,
    action: "remove"
},

// SchoolDay

{
    method: "get",
    route: "/schooldays",
    controller: SchoolDayController,
    action: "all"
}, {
    method: "get",
    route: "/schooldays/:id",
    controller: SchoolDayController,
    action: "one"
}, {
    method: "put",
    route: "/schooldays/:id",
    controller: SchoolDayController,
    action: "update"
}, {
    method: "post",
    route: "/schooldays",
    controller: SchoolDayController,
    action: "save"
}, {
    method: "delete",
    route: "/schooldays/:id",
    controller: SchoolDayController,
    action: "remove"
},

// Attendance

{
    method: "get",
    route: "/attendance",
    controller: AttendanceController,
    action: "all"
}, {
    method: "get",
    route: "/attendance/:id",
    controller: AttendanceController,
    action: "one"
}, {
    method: "put",
    route: "/attendance/:id",
    controller: AttendanceController,
    action: "update"
}, {
    method: "post",
    route: "/attendance",
    controller: AttendanceController,
    action: "save"
}, {
    method: "delete",
    route: "/attendance/:id",
    controller: AttendanceController,
    action: "remove"
},

// RelatedService

{
    method: "get",
    route: "/relatedServices",
    controller: RelatedServiceController,
    action: "all"
}, {
    method: "get",
    route: "/relatedServices/:id",
    controller: RelatedServiceController,
    action: "one"
}, {
    method: "put",
    route: "/relatedServices/:id",
    controller: RelatedServiceController,
    action: "update"
}, {
    method: "post",
    route: "/relatedServices",
    controller: RelatedServiceController,
    action: "save"
}, {
    method: "delete",
    route: "/relatedServices/:id",
    controller: RelatedServiceController,
    action: "remove"
},

// RelatedServiceRole

{
    method: "get",
    route: "/relatedServiceRoles",
    controller: RelatedServiceRoleController,
    action: "all"
}, {
    method: "get",
    route: "/relatedServiceRoles/:id",
    controller: RelatedServiceRoleController,
    action: "one"
}, {
    method: "put",
    route: "/relatedServiceRoles/:id",
    controller: RelatedServiceRoleController,
    action: "update"
}, {
    method: "post",
    route: "/relatedServiceRoles",
    controller: RelatedServiceRoleController,
    action: "save"
}, {
    method: "delete",
    route: "/relatedServiceRoles/:id",
    controller: RelatedServiceRoleController,
    action: "remove"
},

// SessionInfo

{
    method: "get",
    route: "/sessionInfo",
    controller: SessionInfoController,
    action: "all"
}, {
    method: "get",
    route: "/sessionInfo/:id",
    controller: SessionInfoController,
    action: "one"
}, {
    method: "put",
    route: "/sessionInfo/:id",
    controller: SessionInfoController,
    action: "update"
}, {
    method: "post",
    route: "/sessionInfo",
    controller: SessionInfoController,
    action: "save"
}, {
    method: "delete",
    route: "/sessionInfo/:id",
    controller: SessionInfoController,
    action: "remove"
},

// StudentAttendance

{
    method: "get",
    route: "/studentattendance",
    controller: StudentAttendanceController,
    action: "all"
}, {
    method: "get",
    route: "/studentattendance/:id",
    controller: StudentAttendanceController,
    action: "one"
}, {
    method: "put",
    route: "/studentattendance/:id",
    controller: StudentAttendanceController,
    action: "update"
}, {
    method: "post",
    route: "/studentattendance",
    controller: StudentAttendanceController,
    action: "save"
}, {
    method: "delete",
    route: "/studentattendance/:id",
    controller: StudentAttendanceController,
    action: "remove"
},
];