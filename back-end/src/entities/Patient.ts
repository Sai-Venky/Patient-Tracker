import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
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
  }
