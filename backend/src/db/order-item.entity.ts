import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  order?: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "product_id" })
  product?: Product;

  @Column()
  quantity?: number;

  @Column({ name: "unit_price", type: "decimal", precision: 10, scale: 2 })
  unitPrice?: number;
}
