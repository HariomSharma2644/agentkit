import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('blockchain_certificates')
export class BlockchainCertificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  partnerId: string;

  @Column()
  productName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  oilContent: number; // grams per serving

  @Column()
  certificationType: string; // 'low-oil', 'healthy-oil', 'domestic-oil'

  @Column()
  blockchainHash: string;

  @Column()
  transactionHash: string;

  @Column({ nullable: true })
  contractAddress: string;

  @Column({ type: 'jsonb' })
  verificationData: {
    verifiedBy: string;
    verificationDate: string;
    testResults: Record<string, any>;
    certificationBody: string;
  };

  @Column({ type: 'enum', enum: ['pending', 'verified', 'rejected', 'expired'], default: 'pending' })
  status: string;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

