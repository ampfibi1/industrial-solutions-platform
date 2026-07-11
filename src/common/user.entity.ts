import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,OneToMany,JoinColumn,} from 'typeorm';

import { Company } from './company.entity';
import { Role } from './enums/role.enum';

import { Product } from '../admin/entities/product.entity';
import { AdminCompanyOversight } from '../admin/entities/admin-company-oversight.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({length: 100,})
  name?: string;

  @Column({unique: true,length: 100,})
  email?: string;

  @Column()
  password?: string;

  @Column({length: 20,})
  phone?: string;

  @Column({type: 'enum',enum: Role,})
  role?: Role;

  @ManyToOne(() => Company, (company) => company.users, {nullable: true,onDelete: 'SET NULL',})
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @OneToMany(() => Product, (product) => product.createdBy)
  products?: Product[];

  @OneToMany(() => AdminCompanyOversight, (oversight) => oversight.admin,)
  companyOversights?: AdminCompanyOversight[];

  @CreateDateColumn({name: 'created_at',})
  createdAt?: Date;

  @UpdateDateColumn({name: 'updated_at',})
  updatedAt?: Date;
}