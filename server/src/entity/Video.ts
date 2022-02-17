import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Video extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	title: string;

	@Column({
		nullable: true
	})
	poster: string;

	@Column({
		nullable: true
	})
	vidlink: string;

    @Column({
		nullable: true
	})
	number: number;

    @Column({
		nullable: true
	})
	category: string;

    @Column({
		nullable: true
	})
	isFree: boolean;

}