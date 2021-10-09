import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { RelatedServiceRole } from "./RelatedServiceRole";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Entity()
export class RelatedService extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Student, student => student.relatedService)
	student: Student;

    @ManyToOne(() => Teacher, teacher => teacher.relatedService)
	teacher: Teacher;

	@ManyToOne(() => RelatedServiceRole, relatedServiceRole => relatedServiceRole.relatedServices)
	relatedServiceRole: RelatedServiceRole;
}
