import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity("engineer_product_expertise")
export class EngineerProductExpertise {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.productExpertise, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "engineer_id" })
  engineer?: User;

  @ManyToOne(() => Product, (product) => product.engineerExpertise, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product?: Product;

  @CreateDateColumn({ name: "certified_at" })
  certifiedAt?: Date;
}
