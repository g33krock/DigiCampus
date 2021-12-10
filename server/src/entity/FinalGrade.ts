import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn } from "typeorm";

import { Schedule } from './Schedule';
import { Campus } from './Campus';
import { Student } from './Student';

@Entity()
export class FinalGrade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  grade: string;

  @OneToOne(() => Schedule)
  @JoinColumn()
  schedule: Schedule;
}
