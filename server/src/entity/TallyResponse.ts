import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { TallyQuestion } from "./TallyQuestion";
import { Student } from "./Student";
import { Teacher } from "./Teacher";


@Entity()
export class TallyResponse extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Student, student => student.tallyQuestions, {onDelete: 'CASCADE'})
	students: Student;

    @ManyToOne(() => TallyQuestion, tallyQuestion => tallyQuestion.tallyResponses, {onDelete: 'CASCADE'})
	tallyQuestions: TallyQuestion;

    @ManyToOne(() => Teacher, teacher => teacher.tallyResponse, {onDelete: 'CASCADE'})
	teachers: Teacher;

	@Column({
		nullable: true
	})
	tdate: string;

	@Column({
		nullable: true
	})
	question: string;

	@Column({
		nullable: true
	})
	in: number;

	@Column({
		nullable: true
	})
	out: number;

	@Column({
		nullable: true
	})
	point: number;

	@Column({
		nullable: true
	})
	duration: string;
}