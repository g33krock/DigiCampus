import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Campus } from "./Campus";
import { Teacher } from "./Teacher";


@Entity()
export class StaffAttendance extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	date: string;

	@Column({
		nullable: true
	})
	approved: string;

	@Column({
		nullable: true
	})
	illness: string;

    @Column({
		nullable: true
	})
	hours: string;

    @Column({
		nullable: true
	})
	points: number;

	@Column({
		nullable: true
	})
	comment: string;

	@ManyToOne(() => Teacher, teacher => teacher.staffAttendance, {onDelete: 'CASCADE'})
	teachers: Teacher;

	@ManyToOne(() => Campus, campus => campus.staffAttendance, {onDelete: 'CASCADE'})
	campuses: Teacher;
}