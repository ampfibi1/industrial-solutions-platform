import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('service_requests')
export class ServiceRequest {

  @PrimaryGeneratedColumn()
  id?:number;

  @Column()
  customer_id?:number;

  @Column()
  engineer_id?:number;

  @Column()
  product_id?:number;

  @Column()
  description?:string;

  @Column({
    type:'enum',
    enum:['OPEN','IN_PROGRESS','RESOLVED','CLOSED'],
    default:'OPEN'
  })
  status?:string;

  @CreateDateColumn()
  created_at?:Date;

  @Column({nullable:true})
  resolved_at?:Date;
}