import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Entity()
export class Incident extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Student, student => student.incidents, {onDelete: 'CASCADE'})
	students: Student;

    @ManyToOne(() => Teacher, teacher => teacher.incidents)
	teachers: Teacher;

	@Column({
		nullable: true
	})
	date: string;

	@Column({
		nullable: true
	})
	startTime: string;

    @Column({
		nullable: true
	})
	endTime: string;

	@Column({
		nullable: true
	})
	description: string;

	@Column({
		nullable: true
	})
	behavior: string;

	@Column({
		nullable: true
	})
	after: string;

	@Column({
		nullable: true
	})
	others: string;

    @Column({
		nullable: true
	})
	behaviorInterventionPlan: string;

    @Column({
		nullable: true
	})
	bipImplemented: string;

	@Column({
		nullable: true
	})
	redirect: string;

    @Column({
		nullable: true
	})
	reinforce: string;

	@Column({
		nullable: true
	})
	quiet: string;

    @Column({
		nullable: true
	})
	parentContact: string;

    @Column({
		nullable: true
	})
	consultCaseManager: string;
	
	@Column({
		nullable: true
	})
	crisisIntervention: string;

	@Column({
		nullable: true
	})
	crisisStaff: string;

	@Column({
		nullable: true
	})
	crisisMethod: string;

	@Column({
		nullable: true
	})
	crisisDisengagement: number;

	@Column({
		nullable: true
	})
	crisisHold: number;

    @Column({
		nullable: true
	})
	crisisMethodDescription: string;

    @Column({
		nullable: true
	})
	crisisStartTime: string;

    @Column({
		nullable: true
	})
	crisisEndTime: string;

    @Column({
		nullable: true
	})
	crisisLocation: string;

    @Column({
		nullable: true
	})
	crisisReason: string;

    @Column({
		nullable: true
	})
	signature: string;

}
