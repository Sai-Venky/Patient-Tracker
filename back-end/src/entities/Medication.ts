import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
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
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
