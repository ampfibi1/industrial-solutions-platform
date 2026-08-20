import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderStatus } from "./enums/order-status.enum";
import { User } from "./user.entity";
import { OrderItem } from "./order-item.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.customerOrders, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "customer_id" })
  customer?: User;

  @ManyToOne(() => User, (user) => user.salesOrders, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "sales_exec_id" })
  salesExecutive?: User;

  @Column({ type: "enum", enum: OrderStatus })
  status?: OrderStatus;

  @Column({ name: "total_amount", type: "decimal", precision: 12, scale: 2 })
  totalAmount?: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items?: OrderItem[];
}
