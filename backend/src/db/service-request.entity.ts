import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { ServiceStatus } from "./enums/service-status.enum";
import { User } from "./user.entity";

@Entity("service_requests")
export class ServiceRequest {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.serviceRequests, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "customer_id" })
  customer?: User;

  @ManyToOne(() => User, (user) => user.assignedServiceRequests, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "engineer_id" })
  engineer?: User;

  @ManyToOne(() => Product, (product) => product.serviceRequests, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "product_id" })
  product?: Product;

  @Column({ type: "text" })
  description?: string;

  @Column({ type: "enum", enum: ServiceStatus })
  status?: ServiceStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "resolved_at", type: "timestamp", nullable: true })
  resolvedAt?: Date;
}
