import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm';
  import { Medication } from './Medication';
import { MedicalHistory } from './MedicalHistory';
import { Diagnosis } from './Diagnosis';

  @Entity('Patients_Table')
  export class Patient {
    @PrimaryGeneratedColumn('uuid')
    Patient_ID: string;

  
    @Column()
    Name: string;
  
    @Column('int')
    Age: number;
  
    @Column()
    Email: string;
  
    @Column('int')
    Phone_Number: number;
  
    @Column()
    Address: string;
  
    @Column()
    Emergency_Contact: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Medication, (medication) => medication.patient)
  medications: Medication[];

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
  medicalHistory: MedicalHistory[];

  @OneToMany(() => Diagnosis, (diagnoses) => diagnoses.patient)
  diagnoses: Diagnosis[];
  }
