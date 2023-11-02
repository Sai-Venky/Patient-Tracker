import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
import { Patient } from './Patient';

@Entity('Medical_History_Table')
export class MedicalHistory {
  @PrimaryGeneratedColumn('uuid')
  History_ID: string;

  @Column('uuid')
  Patient_ID: string;

  @ManyToOne(() => Patient, (patient) => patient.medicalHistory)
  @JoinColumn({ name: 'Patient_ID' })
  patient: Patient;

  @Column()
  Condition_Name: string;

  @Column()
  Condition_Description: string;

  @Column('date')
  Condition_Start_Date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}