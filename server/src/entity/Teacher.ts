import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Schedule } from "./Schedule";
import { Role } from "./Role";
import { Campus } from "./Campus";
import { Tracker } from "./Tracker";
import { Gradebook } from "./Gradebook";
import { Transcript } from "./Transcript";

@Entity()
export class Teacher extends BaseEntity {
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
	birthDate: string;

	@Column({
		nullable: true
	})
	image: string;

	@Column({
		nullable: true
	})
	email: string;

	@Column({
		nullable: true
	})
	link: string;

	@Column({
		nullable: true
	})
	phone: string;

	@Column({
		nullable: true
	})
	elementary: string;

	@Column({
		nullable: true
	})
	middle: string;

	@Column({
		nullable: true
	})
	math: string;

	@Column({
		nullable: true
	})
	ELA: string;

	@Column({
		nullable: true
	})
	history: string;

	@Column({
		nullable: true
	})
	science: string;

	@Column({
		nullable: true
	})
	elective: string;

	@Column({
		nullable: true
	})
	pOne: string;

	@Column({
		nullable: true
	})
	pTwo: string;

	@Column({
		nullable: true
	})
	pThree: string;

	@Column({
		nullable: true
	})
	pFour: string;

	@Column({
		nullable: true
	})
	pFive: string;

	@Column({
		nullable: true
	})
	pSix: string;

	@Column({
		nullable: true
	})
	pSeven: string;

	@Column({
		nullable: true
	})
	pEight: string;

	@Column({
		nullable: true
	})
	pNine: string;

	@Column({
		nullable: true
	})
	pTen: string;

	@OneToMany(() => Schedule, schedule => schedule.teacher)
	schedules: Schedule[];

	@ManyToOne(() => Role, role => role.teachers)
	role: Role;

	@ManyToOne(() => Campus, campus => campus.teachers)
	campus: Campus;

	@OneToMany(() => Tracker, tracker => tracker.teachers)
	trackers: Tracker[];

	@OneToMany(() => Transcript, transcript => transcript.teachers)
	transcripts: Transcript[];

	@OneToMany(() => Gradebook, gradebook => gradebook.teachers)
	gradebooks: Gradebook[];
}
