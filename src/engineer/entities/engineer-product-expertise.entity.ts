import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('engineer_product_expertise')
export class EngineerProductExpertise {

  @PrimaryGeneratedColumn()
  id?:number;

  @Column()
  engineer_id?:number;

  @Column()
  product_id?:number;

  @CreateDateColumn()
  certified_at?:Date;

}