import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Passwords_Table')
export class Password {
  @PrimaryGeneratedColumn()
  Password_ID: number;

  @Column()
  User_name: string;

  @Column()
  Password_Hash: string;

  @Column()
  Type: string;

  @Column()
  Is_Active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
