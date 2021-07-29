import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Schedule } from "./Schedule";
import { Teacher } from "./Teacher";
import { Course } from "./Course";
import { Campus } from "./Campus";
import { Student } from "./Student";

@Entity()
export class Transcript extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    date: string;

    @Column({
        nullable: true
    })
    school: string;

    @Column({
        nullable: true
    })
    schoolYear: string;

    @Column({
        nullable: true
    })
    semester: string;

    @ManyToOne(() => Student, student => student.transcripts)
    student: Student;

    @ManyToOne(() => Schedule, schedule => schedule.transcripts)
    schedules: Schedule;

    @ManyToOne(() => Campus, campus => campus.transcripts)
    campus: Campus;

    @Column({
        nullable: true
    })
    grade: string;

    @Column({
        nullable: true

    })
    category: string;

    @Column("decimal",{
        nullable: true,
        precision: 5,
        scale: 2
    })
    credit: number;

    @Column({
        nullable: true
    })
    civics: string;

    @Column({
        nullable: true
    })
    altTeacher: string;

    @Column({
        nullable: true
    })
    altCourse: string;

    @Column({
        nullable: true
    })
    altCampus: string;

}