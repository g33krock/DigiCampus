import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity} from "typeorm";
import {Student} from "./Student";

@Entity()
export class Attendance extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    present: string;

    @Column()
    absent: string;

    @ManyToMany(() => Student, student => student.attendance)
    @JoinTable()
    student: Student[];

}