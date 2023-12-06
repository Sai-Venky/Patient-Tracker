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
 * Diagnosis entity representing a table for storing diagnosis information of patients.
*/
@Entity('Diagnoses_Table')
export class Diagnosis {
  @PrimaryGeneratedColumn('uuid')
  Diagnosis_ID: string; // Unique identifier for the diagnosis

  @Column('uuid')
  Patient_ID: string; // Identifier for the patient associated with the diagnosis

  @ManyToOne(() => Patient, (patient) => patient.diagnoses)
  @JoinColumn({ name: 'Patient_ID' })
  patient: Patient; // Relation to Patient entity

  @Column()
  Diagnosis: string; // Description of the diagnosis

  @Column('date')
  Date: Date; // Date of the diagnosis

  @Column()
  Doctor_Name: string; // Name of the doctor who made the diagnosis

  @CreateDateColumn()
  Created_At: Date; // Auto-generated timestamp for when the record was created

  @UpdateDateColumn()
  Updated_At: Date; // Auto-generated timestamp for when the record was last updated
}
