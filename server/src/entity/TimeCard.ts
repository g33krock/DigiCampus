import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

import { Teacher } from "./Teacher";


@Entity()
export class TimeCard extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	date: string;

	@ManyToOne(() => Teacher, teacher => teacher.timecard)
	teacher: Teacher;

	@Column({
		nullable: true
	})
	time: number;

	@Column({
		nullable: true
	})
	inOut: string;

}
