import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cuisineType: string; // e.g., 'North Indian', 'South Indian', 'Bengali'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  oilQuantityGrams: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  servings: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  caloriesPerServing: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fatPerServing: number;

  @Column({ type: 'jsonb' })
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];

  @Column({ type: 'text' })
  instructions: string;

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @Column({ type: 'jsonb', nullable: true })
  healthBenefits: string[];

  @Column({ type: 'jsonb', nullable: true })
  dietaryRestrictions: string[];

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ type: 'enum', enum: ['low-oil', 'medium-oil', 'high-oil'], default: 'low-oil' })
  oilCategory: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

