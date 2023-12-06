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
    Created_At: Date;
  
    @UpdateDateColumn()
    Updated_At: Date;

  @OneToMany(() => Medication, (medication) => medication.patient)
  medications: Medication[];

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
  medicalHistory: MedicalHistory[];

  @OneToMany(() => Diagnosis, (diagnoses) => diagnoses.patient)
  diagnoses: Diagnosis[];
  }
