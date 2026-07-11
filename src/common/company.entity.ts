import {  Entity,  PrimaryGeneratedColumn,  Column,  CreateDateColumn,  OneToMany,} from 'typeorm';

import { User } from './user.entity';
import { AdminCompanyOversight } from '../admin/entities/admin-company-oversight.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({  length: 150,})
  name?: string;

  @Column({  unique: true,  length: 100,})
  gstNumber?: string;

  @Column({   type: 'text', })
  address?: string;

  @Column({  length: 100,})
  industry?: string;

  // One Company -> Many Users (Customers)
  @OneToMany(() => User, (user) => user.company,  )
  users?: User[];

  // Many Admins <-> Many Companies
  @OneToMany(() => AdminCompanyOversight,(oversight) => oversight.company,)
  adminOversights?: AdminCompanyOversight[];

  @CreateDateColumn({name: 'created_at',})
  createdAt?: Date;
}