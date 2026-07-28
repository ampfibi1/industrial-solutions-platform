import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn,} from 'typeorm';
import { Category } from '../../common/category.entity';
import { User } from '../../common/user.entity'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true,length: 50,})
  sku?: string;

  @Column({length: 150,})
  name?: string;

  @Column({type: 'text',nullable: true,})
  description?: string;

  @Column({type: 'decimal',precision: 10,scale: 2,})
  price?: number;

  @Column({default: 0,})
  stock?: number;

  @ManyToOne(() => Category,(category) => category.products,{  nullable: false,  onDelete: 'RESTRICT',},)
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @ManyToOne(() => User,(user) => user.products,{  nullable: false,  onDelete: 'CASCADE',},)
  @JoinColumn({ name: 'created_by_id' })
  createdBy?: User;

  @CreateDateColumn({  name: 'created_at',})
  createdAt?: Date;
}