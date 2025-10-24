import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';

@Entity('health_metrics')
export class HealthMetric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.healthMetrics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number; // kg

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height: number; // cm

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  bmi: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  bloodPressureSystolic: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  bloodPressureDiastolic: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  cholesterol: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  bloodSugar: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  dailyOilIntake: number; // grams

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  recommendedOilIntake: number; // grams (based on ICMR guidelines)

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  healthRiskScore: number; // 0-100

  @Column({ type: 'enum', enum: ['low', 'moderate', 'high', 'critical'], default: 'moderate' })
  riskLevel: string;

  @Column({ type: 'jsonb', nullable: true })
  riskFactors: string[];

  @Column({ type: 'jsonb', nullable: true })
  recommendations: string[];

  @CreateDateColumn()
  recordedAt: Date;
}

