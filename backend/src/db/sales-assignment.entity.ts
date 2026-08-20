import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("sales_assignments")
export class SalesAssignment {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.salesAssignments, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "sales_exec_id" })
  salesExecutive?: User;

  @ManyToOne(() => User, (user) => user.assignedCustomers, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "customer_id" })
  customer?: User;

  @Column({ length: 100 })
  region?: string;

  @CreateDateColumn({ name: "assigned_at" })
  assignedAt?: Date;
}
