import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./Student";
import { Schedule } from "./Schedule";
import { Teacher } from "./Teacher";
import { Course } from "./Course";

@Entity()
export class Tracker extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Student, student => student.trackers, {onDelete: 'CASCADE'})
	students: Student;

    @ManyToOne(() => Teacher, teacher => teacher.trackers)
	teachers: Teacher;
    
	@ManyToOne(() => Schedule, schedule => schedule.trackers)
	schedules: Course;

	@Column({
		nullable: true
	})
	date: string;

	@Column({
		nullable: false
	})
	attendance: string;

	@ManyToOne(() => Course, course => course.trackers)
	courses: Course;

	@Column({
		nullable: true
	})
	period: number;

	@Column({
		nullable: true
	})
	lesson: string;

	@Column({
		nullable: true
	})
	comprehension: number;

	@Column({
		nullable: true
	})
	comprehensionAI: string;

    @Column({
		nullable: true
	})
	comprehensionComment: string;

    @Column({
		nullable: true
	})
	engagement: number;

	@Column({
		nullable: true
	})
	engagementAI: string;

    @Column({
		nullable: true
	})
	engagementComment: string;

    @Column({
		nullable: true
	})
	behavior: number;

	@Column({
		nullable: true
	})
	behaviorAI: string;

    @Column({
		nullable: true
	})
	behaviorComment: string;

    @Column({
		nullable: true
	})
	assessment: string;
	
	@Column({
		nullable: true
	})
	SEL1: string;

	@Column({
		nullable: true
	})
	SEL2: string;

	@Column({
		nullable: true
	})
	SEL3: string;

	@Column({
		nullable: true
	})
	SEL4: string;

	@Column({
		nullable: true
	})
	SEL5: string;

	@Column({
		nullable: true
	})
	method: string;

}
