import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../common/user.entity';
import { Product } from '../../admin/entities/product.entity';

export enum ServiceStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

@Entity('service_requests')
export class ServiceRequest {

  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id' })
  customer?: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'engineer_id' })
  engineer?: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @Column()
  description?: string;

  @Column({
    type: 'enum',
    enum: ServiceStatus,
    default: ServiceStatus.OPEN,
  })
  status?: ServiceStatus;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true })
  resolvedAt?: Date;
}