import {  Entity,  PrimaryGeneratedColumn,  ManyToOne,  JoinColumn,  CreateDateColumn,} from 'typeorm';
import { User } from '../../common/user.entity';
import { Company } from '../../common/company.entity';

@Entity('admin_company_oversight')
export class AdminCompanyOversight {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User,(user) => user.companyOversights,{  nullable: false,  onDelete: 'CASCADE',},)
  @JoinColumn({ name: 'admin_id' })
  admin?: User;

  @ManyToOne(() => Company,(company) => company.adminOversights,{  nullable: false,  onDelete: 'CASCADE',},)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @CreateDateColumn({  name: 'assigned_at',})
  assignedAt?: Date;
}