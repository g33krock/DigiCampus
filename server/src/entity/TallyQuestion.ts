import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { TallyResponse } from "./TallyResponse";
import { Student } from "./Student";


@Entity()
export class TallyQuestion extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Student, student => student.tallyQuestions, {onDelete: 'CASCADE'})
	student: Student;

	@OneToMany(() => TallyResponse, tallyResponse => tallyResponse.tallyQuestions)
	tallyResponses: Student[];

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
	category: string;
}