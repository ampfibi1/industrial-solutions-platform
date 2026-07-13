import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity("Customer")
export class CustomerEntity{

@PrimaryGeneratedColumn({ unsigned: true })
id?: number;

@Column({ length: 100 })
fullname?: string;

@Column({ unsigned: true })
age?: number;


@Column({
    default: 'active',
    enum: ['active', 'inactive'],
    })
status?: 'active'| 'inactive';


}