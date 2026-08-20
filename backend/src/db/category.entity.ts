import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true, length: 100 })
  name?: string;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
