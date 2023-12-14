import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    PrimaryColumn
  } from 'typeorm';
  import { Medication } from './medication_entity';
  import { MedicalHistory } from './medicalhistory_entity';
  import { Diagnosis } from './diagnosis_entity';

/**
 * Patient entity representing a table for storing patient information.
*/
@Entity('Patients_Table')
export class Patient {
  // @PrimaryGeneratedColumn('uuid')
  // Patient_ID: string; // Unique identifier for the patient

  @PrimaryColumn()
  Patient_ID: string; // UserName/Patient_ID of the patient

  @Column({default: "Unknown"})
  Name: string; // Name of the patient

  @Column('int',{default: 0})
  Age: number; // Age of the patient

  @Column({default: ""})
  Email: string; // Email address of the patient

  @Column('int',{default: 0})
  Phone_Number: number; // Phone number of the patient

  @Column({default: ""})
  Address: string; // Address of the patient

  @Column({default: ""})
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