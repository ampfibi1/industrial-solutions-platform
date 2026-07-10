import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity("customer")
export class CustomerEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@Column()
email: string;
@Column()
password: string;
}