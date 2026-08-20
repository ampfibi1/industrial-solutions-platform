import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { EngineerProductExpertise } from "./engineer-product-expertise.entity";
import { User } from "./user.entity";
import { OrderItem } from "./order-item.entity";
import { ServiceRequest } from "./service-request.entity";
import { WishlistItem } from "./wishlist-item.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true, length: 50 })
  sku?: string;

  @Column({ length: 150 })
  name?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price?: number;

  @Column({ default: 0 })
  stock?: number;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @ManyToOne(() => User, (user) => user.products, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "created_by_id" })
  createdBy?: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems?: OrderItem[];

  @OneToMany(() => ServiceRequest, (request) => request.product)
  serviceRequests?: ServiceRequest[];

  @OneToMany(() => EngineerProductExpertise, (expertise) => expertise.product)
  engineerExpertise?: EngineerProductExpertise[];

  @OneToMany(() => WishlistItem, (item) => item.product)
  wishlistItems?: WishlistItem[];
}
