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

@Entity('Diagnoses_Table')
export class Diagnosis {
  @PrimaryGeneratedColumn('uuid')
  Diagnosis_ID: string;

  @Column('uuid')
  Patient_ID: string;

  @ManyToOne(() => Patient, (patient) => patient.diagnoses)
  @JoinColumn({ name: 'Patient_ID' })
  patient: Patient;

  @Column()
  Diagnosis: string;

  @Column('date')
  Date: Date;

  @Column()
  Doctor_Name: string;

  @CreateDateColumn()
  Created_At: Date;

  @UpdateDateColumn()
  Updated_At: Date;
}
