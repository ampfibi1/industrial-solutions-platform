import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdminCompanyOversight } from "./admin-company-oversight.entity";
import { User } from "./user.entity";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 150 })
  name?: string;

  @Column({ name: "gst_number", unique: true, length: 100 })
  gstNumber?: string;

  @Column({ type: "text" })
  address?: string;

  @Column({ length: 100 })
  industry?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @OneToMany(() => User, (user) => user.company)
  users?: User[];

  @OneToMany(() => AdminCompanyOversight, (oversight) => oversight.company)
  adminOversights?: AdminCompanyOversight[];
}
