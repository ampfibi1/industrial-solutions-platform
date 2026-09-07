import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../db/order.entity';
import { OrderItem } from '../db/order-item.entity';
import { SalesAssignment } from '../db/sales-assignment.entity';
import { User } from '../db/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(SalesAssignment)
    private readonly assignmentRepo: Repository<SalesAssignment>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // ── ROUTE 1: Create Order (POST) ────────────────────────────────────────
  async createOrder(dto: CreateOrderDto, salesExecId: number) {
    // Find customer
    const customer = await this.userRepo.findOne({
      where: { id: dto.customer_id },
    });
    if (!customer) {
      throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
    }

    // Find sales executive
    const salesExec = await this.userRepo.findOne({
      where: { id: salesExecId },
    });

    // Calculate total amount
    const total = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0,
    );

    // Create order items
    const items = dto.items.map((item) =>
      this.orderItemRepo.create({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }),
    );

    // Create and save order
    const order = this.orderRepo.create({
     customer,
     salesExec: salesExec ?? undefined,   // ← fix null error
     items,
     total_amount: total,
    });

    return await this.orderRepo.save(order);
  }

  // ── ROUTE 2: Get All Orders (GET) ───────────────────────────────────────
  async getAllOrders() {
    return await this.orderRepo.find();
  }

  // ── ROUTE 3: Get One Order (GET) ────────────────────────────────────────
  async getOrderById(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  // ── ROUTE 4: Update Order Status (PATCH) ────────────────────────────────
  async updateOrderStatus(id: number, dto: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    order.status = dto.status;
    return await this.orderRepo.save(order);
  }

  // ── ROUTE 5: Delete Order (DELETE) ──────────────────────────────────────
  async deleteOrder(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    await this.orderRepo.remove(order);
    return { message: `Order ${id} deleted successfully.` };
  }

  //  ROUTE 6: Create Assignment (POST) 
  async createAssignment(dto: CreateAssignmentDto, salesExecId: number) {
    const salesExec = await this.userRepo.findOne({
      where: { id: salesExecId },
    });
    const customer = await this.userRepo.findOne({
      where: { id: dto.customer_id },
    });
    if (!customer) {
      throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
    }

    const assignment = this.assignmentRepo.create({
     salesExec: salesExec ?? undefined,   // ← fix null error
     customer,
     region: dto.region,
   });
    return await this.assignmentRepo.save(assignment);
  }

  //  ROUTE 7: Get All Assignments (GET) ──────────────────────────────────
  async getAllAssignments() {
    return await this.assignmentRepo.find();
  }
}