import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { SpedQuestion } from "./SpedQuestion";
import { Student } from "./Student";
import { Teacher } from "./Teacher";


@Entity()
export class SpedResponse extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Student, student => student.spedQuestions, {onDelete: 'CASCADE'})
	students: Student;

    @ManyToOne(() => SpedQuestion, spedQuestion => spedQuestion.spedResponses, {onDelete: 'CASCADE'})
	spedQuestions: SpedQuestion;

    @ManyToOne(() => Teacher, teacher => teacher.spedResponse, {onDelete: 'CASCADE'})
	teachers: Teacher;

	@Column({
		nullable: true
	})
	date: string;

	@Column({
		nullable: true
	})
	question: string;

	@Column({
		nullable: true
	})
	meet: string;

	@Column({
		nullable: true
	})
	success: number;

	@Column({
		nullable: true
	})
	opportunity: number;

    @Column({
		nullable: true
	})
	response: string;
}