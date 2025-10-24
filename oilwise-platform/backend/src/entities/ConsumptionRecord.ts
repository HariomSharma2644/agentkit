import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';

@Entity('consumption_records')
export class ConsumptionRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.consumptionRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  oilQuantityGrams: number;

  @Column()
  oilType: string; // e.g., 'palm', 'sunflower', 'mustard', 'coconut'

  @Column()
  mealType: string; // e.g., 'breakfast', 'lunch', 'dinner', 'snack'

  @Column({ nullable: true })
  dishName: string;

  @Column({ nullable: true })
  cuisineType: string;

  @Column({ type: 'jsonb', nullable: true })
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedCalories: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedFat: number;

  @Column({ nullable: true })
  source: string; // 'manual', 'iot_device', 'recipe', 'restaurant'

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  recordedAt: Date;
}

