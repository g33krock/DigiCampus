import { BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Announcement extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	head: string;

	@Column({
		nullable: true
	})
	body: string;

}