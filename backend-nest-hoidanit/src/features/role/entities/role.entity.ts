import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ unique: true, length: 50 })
  name: string;

  @Column({ nullable: true, length: 255 })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
