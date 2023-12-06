import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Password entity representing a table for storing user authentication information.
*/
@Entity('passwords')
export class Password {
  @PrimaryGeneratedColumn()
  password_id: number; // Unique identifier for the password record

  @Column()
  user_name: string; // Username associated with the password

  @Column()
  password_hash: string; // Hashed password

  @Column()
  type: string; // Type of user (e.g., 'doctor', 'patient')

  @Column()
  is_active: boolean; // Flag indicating whether the user account is active

  @CreateDateColumn()
  created_at: Date; // Auto-generated timestamp for when the record was created

  @UpdateDateColumn()
  updated_at: Date; // Auto-generated timestamp for when the record was last updated
}