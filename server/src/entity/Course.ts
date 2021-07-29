import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Gradebook } from "./Gradebook";
import { Schedule } from "./Schedule";
import { Tracker } from "./Tracker";
import { Transcript } from "./Transcript";

@Entity()
export class Course extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Schedule, schedule => schedule.course)
	schedules: Schedule[];

	@Column({
		nullable: true
	})
	name: string;

	@Column({
		nullable: true
	})
	subject: string;

	@Column({
		nullable: true
	})
	grade: string;

	@Column({
		nullable: true
	})
	credit: string;

	@OneToMany(() => Tracker, tracker => tracker.courses)
	trackers: Tracker[];

	@OneToMany(() => Gradebook, gradebook => gradebook.courses)
	gradebooks: Gradebook[];
}