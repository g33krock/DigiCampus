import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import {Student} from "./Student";
import { SchoolDay } from "./SchoolDay";

@Entity()
export class StudentAttendance extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

	@ManyToOne(() => Student, student => student.studentattendance)
	student: Student;

    @ManyToOne(() => SchoolDay, schoolday => schoolday.studentattendance)
	schoolday: SchoolDay;

    @Column({
		nullable: true
	})
	attendance: string;

}