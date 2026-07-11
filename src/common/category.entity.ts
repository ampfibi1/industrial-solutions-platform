import {Entity,PrimaryGeneratedColumn,Column,OneToMany,} from 'typeorm';
import { Product } from '../admin/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({  unique: true,  length: 100,})
  name?: string;

  @OneToMany(() => Product,(product) => product.category,)
  products?: Product[];
}