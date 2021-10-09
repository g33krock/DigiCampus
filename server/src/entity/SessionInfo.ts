import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { RelatedServiceRoleController } from "../controller/RelatedServiceRoleController";
import { RelatedServiceRole } from "./RelatedServiceRole";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Entity()
export class SessionInfo extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	date: string;

	@Column({
		nullable: true
	})
	minutes: number;

	@Column({
		nullable: true
	})
	comment: string;

    @ManyToOne(() => Student, student => student.sessionInfo)
	student: Student;

    @ManyToOne(() => Teacher, teacher => teacher.sessionInfo)
	teacher: Teacher;

    @ManyToOne(() => RelatedServiceRole, relatedServiceRole => relatedServiceRole.sessionInfo)
	relatedServiceRole: RelatedServiceRole;
}