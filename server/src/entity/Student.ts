import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Schedule } from "./Schedule";
import { Guardian } from "./Guardian";
import { Campus } from "./Campus";
import { Tracker } from "./Tracker";
import { Gradebook } from "./Gradebook";
import { Funding } from "./Funding";
import { InstructionMode } from "./InstructionMode";
import { SpedQuestion } from "./SpedQuestion";
import { Transcript } from "./Transcript";
import { Incident } from "./Incident";

@Entity()
export class Student extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	firstName: string;

	@Column({
		nullable: true
	})
	lastName: string;

	@Column({
		nullable: true
	})
	grade: number;

	@Column({
		nullable: true
	})
	profile_image: string;

	@Column({
		nullable: true
	})
	iep: string;

	@Column({
		nullable: true
	})
	birthDate: string;

	@Column({
		nullable: true
	})
	campus: string;

	@Column({
		nullable: true
	})
	previousSchools: string;

	@Column({
		nullable: true
	})
	medical_information: string;

	@Column({
		nullable: true
	})
	allergies: string;

	@Column({
		nullable: true
	})
	hearingLimitations: string;

	@Column({
		nullable: true
	})
	visionLimitations: string;

	@Column({
		nullable: true
	})
	mobilityLimitations: string;

	@Column({
		nullable: true
	})
	sensitivities: string;

	@Column({
		nullable: true
	})
	therapies: string;

	@Column({
		nullable: true
	})
	medicationsAtSchool: string;

	@Column({
		nullable: true
	})
	social: string;

	@Column({
		nullable: true
	})
	emotional: string;

	@Column({
		nullable: true
	})
	physical: string;

	@Column({
		nullable: true
	})
	math: string;

	@Column({
		nullable: true
	})
	reading: string;

	@Column({
		nullable: true
	})
	writing: string;

	@Column({
		nullable: true
	})
	interests: string;

	@Column({
		nullable: true
	})
	additional_information: string;

	@Column({
		nullable: true
	})
	withdraw: string;

	@OneToMany(() => Schedule, schedule => schedule.student, {onDelete: 'CASCADE'})
	schedules: Schedule[];

	@OneToMany(() => Guardian, guardian => guardian.student, {onDelete: 'CASCADE'})
	guardians: Guardian[];

	@ManyToOne(() => Campus, campus => campus.students)
	campuses: Campus;

	@OneToMany(() => Tracker, tracker => tracker.students, {onDelete: 'CASCADE'})
	trackers: Tracker[];

	@OneToMany(() => Incident, incident => incident.students, {onDelete: 'CASCADE'})
	incidents: Incident[];

	@OneToMany(() => Transcript, transcript => transcript.student, {onDelete: 'CASCADE'})
	transcripts: Transcript[];

	@OneToMany(() => Gradebook, gradebook => gradebook.students, {onDelete: 'CASCADE'})
	gradebooks: Gradebook[];

	@ManyToOne(() => Funding, funding => funding.students)
	funding: Funding;

	@ManyToOne(() => InstructionMode, instructionmode => instructionmode.students)
	instructionmode: InstructionMode;

	@ManyToOne(() => Guardian, guardian => guardian.students, {onDelete: 'CASCADE'})
	guardian: Guardian;

	@OneToMany(() => SpedQuestion, spedQuestion => spedQuestion.student, {onDelete: 'CASCADE'})
	spedQuestions: SpedQuestion[];
}
