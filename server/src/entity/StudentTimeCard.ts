import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Student } from "./Student";


@Entity()
export class StudentTimeCard extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	date: string;

	@ManyToOne(() => Student, student => student.stimecard)
	student: Student;

	@Column({
		nullable: true
	})
	time: string;

	@Column({
		nullable: true
	})
	inOut: string;

}
