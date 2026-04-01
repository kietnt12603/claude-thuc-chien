import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index({ unique: true })
  @Column({ name: 'token_hash', length: 255 })
  token_hash: string;

  @Column({ name: 'device_name', length: 100, nullable: true })
  device_name: string;

  @Column({ name: 'ip_address', length: 45, nullable: true })
  ip_address: string;

  @Column({ name: 'user_agent', length: 255, nullable: true })
  user_agent: string;

  @Column({ name: 'expires_at' })
  expires_at: Date;

  @Column({ name: 'is_revoked', default: false })
  is_revoked: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
