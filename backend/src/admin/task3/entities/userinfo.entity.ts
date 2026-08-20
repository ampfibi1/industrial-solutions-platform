import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserInfo{
    @PrimaryGeneratedColumn()
    id?:number;

    @Column({type:"varchar",length:150,name:"UUID"})
    //@Generated('uuid')
    uniqueId?:string;

    @Column({type:'timestamp',default:()=>'current_timestamp'})
    joiningDate?:Date;

    @Column({type:'varchar',length:30,default:'Unknown'})
    country?:string;
}