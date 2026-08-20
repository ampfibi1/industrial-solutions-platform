import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("customer_addresses")
export class CustomerAddress {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.customerAddresses, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "customer_id" })
  customer?: User;

  @Column({ length: 50 })
  label?: string;

  @Column({ name: "receiver_name", length: 100 })
  receiverName?: string;

  @Column({ length: 20 })
  phone?: string;

  @Column({ name: "address_line", type: "text" })
  addressLine?: string;

  @Column({ length: 100 })
  city?: string;

  @Column({ name: "postal_code", length: 20 })
  postalCode?: string;

  @Column({ length: 100 })
  country?: string;

  @Column({ name: "is_default", default: false })
  isDefault?: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;
}
