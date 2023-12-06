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
 * Medication entity representing a table for storing medication information of patients.
*/
@Entity('Medications_Table')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  Medication_ID: string; // Unique identifier for the medication record

  @Column('uuid')
  Patient_ID: string; // Identifier for the patient associated with the medication

  @ManyToOne(() => Patient, (patient) => patient.medications)
  @JoinColumn({ name: 'Patient_ID' })
  patient: Patient; // Relation to Patient entity

  @Column()
  Medication_Name: string; // Name of the medication

  @Column()
  Dosage: string; // Dosage of the medication

  @Column()
  Frequency: string; // Frequency at which the medication is to be taken

  @CreateDateColumn()
  Created_At: Date; // Auto-generated timestamp for when the record was created

  @UpdateDateColumn()
  Updated_At: Date; // Auto-generated timestamp for when the record was last updated
}
