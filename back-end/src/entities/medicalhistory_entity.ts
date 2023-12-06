import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
import { Patient } from './patient_entity';

/**
 * MedicalHistory entity representing a table for storing medical history of patients.
*/
@Entity('Medical_History_Table')
export class MedicalHistory {
  @PrimaryGeneratedColumn('uuid')
  History_ID: string; // Unique identifier for the medical history record

  @Column('uuid')
  Patient_ID: string; // Identifier for the patient associated with the medical history

  @ManyToOne(() => Patient, (patient) => patient.medicalHistory)
  @JoinColumn({ name: 'Patient_ID' })
  patient: Patient; // Relation to Patient entity

  @Column()
  Condition_Name: string; // Name of the medical condition

  @Column()
  Condition_Description: string; // Description of the medical condition

  @Column('date')
  Condition_Start_Date: Date; // Start date of the medical condition

  @CreateDateColumn()
  Created_At: Date; // Auto-generated timestamp for when the record was created

  @UpdateDateColumn()
  Updated_At: Date; // Auto-generated timestamp for when the record was last updated
}