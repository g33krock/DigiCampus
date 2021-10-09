import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { RelatedService } from "./RelatedService";
import { SessionInfo } from "./SessionInfo";

@Entity()
export class RelatedServiceRole extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true
	})
	type: string;

	@OneToMany(() => RelatedService, relatedService => relatedService.relatedServiceRole, {onDelete: 'CASCADE'})
	relatedServices: RelatedService[];

	@OneToMany(() => SessionInfo, sessionInfo => sessionInfo.relatedServiceRole, {onDelete: 'CASCADE'})
	sessionInfo: SessionInfo[];    
}