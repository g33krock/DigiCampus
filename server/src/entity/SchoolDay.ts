import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { StudentAttendance } from "./StudentAttendance";

@Entity()
export class SchoolDay extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	date: string;

	@Column({
		nullable: true
	})
	iso_year: number;

	@Column({
		nullable: true
	})
	week: number;


	@Column({
		nullable: true
	})
	year: number;

	@Column({
		nullable: true
	})
	dow: number;

	@Column({
		nullable: true
	})
	leap: boolean;

	@Column({
		nullable: true
	})
	inSchool: boolean;

	@OneToMany(() => StudentAttendance, studentattendance => studentattendance.schoolday, {onDelete: 'CASCADE'})
	studentattendance: StudentAttendance[];
}