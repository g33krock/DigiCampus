import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Student } from "./Student";

@Entity()
export class District extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	name: string;

    @Column({
		nullable: true
	})
	firstName: string;

	@Column({
		nullable: true
	})
	lastName: string;

	@Column({
		nullable: true
	})
	phone: string;

	@Column({
		nullable: true
	})
	email: string;

	@Column({
		nullable: true
	})
	address: string;

	@Column({
		nullable: true
	})
	additional_info: string;

	@OneToMany(() => Student, student => student.district)
	students: District[];
}
