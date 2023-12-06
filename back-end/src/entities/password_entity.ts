import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('passwords')
export class Password {
  @PrimaryGeneratedColumn()
  password_id: number;

  @Column()
  user_name: string;

  @Column()
  password_hash: string;

  @Column()
  type: string;

  @Column()
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
