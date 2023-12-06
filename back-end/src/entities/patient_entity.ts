import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm';
  import { Medication } from './medication_entity';
  import { MedicalHistory } from './medicalhistory_entity';
  import { Diagnosis } from './diagnosis_entity';

/**
 * Patient entity representing a table for storing patient information.
*/
@Entity('Patients_Table')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  Patient_ID: string; // Unique identifier for the patient

  @Column()
  Name: string; // Name of the patient

  @Column('int')
  Age: number; // Age of the patient

  @Column()
  Email: string; // Email address of the patient

  @Column('int')
  Phone_Number: number; // Phone number of the patient

  @Column()
  Address: string; // Address of the patient

  @Column()
  Emergency_Contact: string; // Emergency contact information

  @CreateDateColumn()
  Created_At: Date; // Auto-generated timestamp for when the record was created

  @UpdateDateColumn()
  Updated_At: Date; // Auto-generated timestamp for when the record was last updated

  @OneToMany(() => Medication, (medication) => medication.patient)
  medications: Medication[]; // Relation to Medication entities

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
  medicalHistory: MedicalHistory[]; // Relation to MedicalHistory entities

  @OneToMany(() => Diagnosis, (diagnoses) => diagnoses.patient)
  diagnoses: Diagnosis[]; // Relation to Diagnosis entities
}