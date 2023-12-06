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

@Entity('Medications_Table')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  Medication_ID: string;

  @Column('uuid')
  Patient_ID: string;

  @ManyToOne(() => Patient, (patient) => patient.medications)
  @JoinColumn({ name: 'Patient_ID' })
  patient: Patient;

  @Column()
  Medication_Name: string;

  @Column()
  Dosage: string;

  @Column()
  Frequency: string;

  @CreateDateColumn()
  Created_At: Date;

  @UpdateDateColumn()
  Updated_At: Date;
}
