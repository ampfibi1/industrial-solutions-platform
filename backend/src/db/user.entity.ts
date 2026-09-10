import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AdminCompanyOversight } from "./admin-company-oversight.entity";
import { Company } from "./company.entity";
import { Role } from "./enums/role.enum";
import { EngineerProductExpertise } from "./engineer-product-expertise.entity";
import { Order } from "./order.entity";
import { Product } from "./product.entity";
import { SalesAssignment } from "./sales-assignment.entity";
import { ServiceRequest } from "./service-request.entity";
import { WishlistItem } from "./wishlist-item.entity";
import { CustomerAddress } from "./customer-address.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 100 })
  name?: string;

  @Column({ unique: true, length: 100 })
  email?: string;

  @Column()
  password?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: "enum", enum: Role })
  role?: Role;

  @ManyToOne(() => Company, (company) => company.users, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "company_id" })
  company?: Company;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @OneToMany(() => Product, (product) => product.createdBy)
  products?: Product[];

  @OneToMany(() => AdminCompanyOversight, (oversight) => oversight.admin)
  companyOversights?: AdminCompanyOversight[];

  @OneToMany(() => Order, (order) => order.customer)
  customerOrders?: Order[];

  @OneToMany(() => Order, (order) => order.salesExecutive)
  salesOrders?: Order[];

  @OneToMany(() => ServiceRequest, (request) => request.customer)
  serviceRequests?: ServiceRequest[];

  @OneToMany(() => ServiceRequest, (request) => request.engineer)
  assignedServiceRequests?: ServiceRequest[];

  @OneToMany(() => SalesAssignment, (assignment) => assignment.salesExecutive)
  salesAssignments?: SalesAssignment[];

  @OneToMany(() => SalesAssignment, (assignment) => assignment.customer)
  assignedCustomers?: SalesAssignment[];

  @OneToMany(() => EngineerProductExpertise, (expertise) => expertise.engineer)
  productExpertise?: EngineerProductExpertise[];

  @OneToMany(() => WishlistItem, (item) => item.customer)
  wishlistItems?: WishlistItem[];

  @OneToMany(() => CustomerAddress, (address) => address.customer)
  customerAddresses?: CustomerAddress[];
}
