import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { ConsumptionRecord } from './ConsumptionRecord';
import { HealthMetric } from './HealthMetric';
import { RewardPoint } from './RewardPoint';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: ['household', 'school', 'hospital', 'restaurant', 'manufacturer', 'policymaker'], default: 'household' })
  userType: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'jsonb', nullable: true })
  preferences: {
    language?: string;
    cuisinePreferences?: string[];
    dietaryRestrictions?: string[];
    healthGoals?: string[];
  };

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  totalRewardPoints: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ConsumptionRecord, record => record.user)
  consumptionRecords: ConsumptionRecord[];

  @OneToMany(() => HealthMetric, metric => metric.user)
  healthMetrics: HealthMetric[];

  @OneToMany(() => RewardPoint, reward => reward.user)
  rewards: RewardPoint[];
}

