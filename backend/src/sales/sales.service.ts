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
import { MailService } from '../mailer/mail.service';

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

    private readonly mailService: MailService,
  ) {}

  // ── ROUTE 1: Create Order ──────────────────────────────────────────────
  async createOrder(dto: CreateOrderDto, salesExecId: number) {
    // Find customer
    const customer = await this.userRepo.findOne({
      where: { id: dto.customer_id },
    });
    if (!customer) {
      throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
    }

    // Validate customer email  ← FIX 1
    if (!customer.email) {
      throw new HttpException('Customer email is missing.', HttpStatus.BAD_REQUEST);
    }

    // Validate customer name  ← FIX 1
    if (!customer.name) {
      throw new HttpException('Customer name is missing.', HttpStatus.BAD_REQUEST);
    }

    // Find sales executive
    const salesExec = await this.userRepo.findOne({
      where: { id: salesExecId },
    });
    if (!salesExec) {
      throw new HttpException('Sales executive not found.', HttpStatus.NOT_FOUND);
    }

    // Calculate total
    const total = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0,
    );

    // Create order items
    const items = dto.items.map((item) =>
      this.orderItemRepo.create({
        product: { id: item.product_id },
        quantity: item.quantity,
        unitPrice: item.unit_price,
      }),
    );

    // Create order
    const order = this.orderRepo.create({
      customer,
      salesExecutive: salesExec,
      items,
      totalAmount: total,
    });

    const savedOrder = await this.orderRepo.save(order);

    if (savedOrder.id == null) {
    throw new Error('Saved order does not have an ID');
    }

    // Send confirmation email
    try {
      await this.mailService.sendOrderConfirmation(
        customer.email,    // ✅ validated above
        customer.name,     // ✅ validated above
        savedOrder.id,
        total,
      );
    } catch (err: unknown) {                                        // ← FIX 2
      const message = err instanceof Error ? err.message : String(err);
      console.error('Email sending failed:', message);
    }

    return savedOrder;
  }

  // ── ROUTE 2: Get All Orders ────────────────────────────────────────────
  async getAllOrders() {
    return await this.orderRepo.find({
      relations: {                  // ← FIX 3 (object not array)
        customer: true,
        salesExecutive: true,
        items: true,
      },
    });
  }

  // ── ROUTE 3: Get One Order ─────────────────────────────────────────────
  async getOrderById(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: {                  // ← FIX 3
        customer: true,
        salesExecutive: true,
        items: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  // ── ROUTE 4: Update Order Status ──────────────────────────────────────
  async updateOrderStatus(id: number, dto: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: {                  // ← FIX 3
        customer: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    // Check customer loaded  ← FIX 4
    if (!order.customer) {
      throw new HttpException('Order customer was not loaded.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Validate email and name  ← FIX 1
    if (!order.customer.email) {
      throw new HttpException('Customer email is missing.', HttpStatus.BAD_REQUEST);
    }
    if (!order.customer.name) {
      throw new HttpException('Customer name is missing.', HttpStatus.BAD_REQUEST);
    }

    order.status = dto.status;
    const updated = await this.orderRepo.save(order);

    // Send status update email
    try {
      await this.mailService.sendStatusUpdate(
        order.customer.email,    // ✅ validated above
        order.customer.name,     // ✅ validated above
        id,
        dto.status,
      );
    } catch (err: unknown) {                                        // ← FIX 2
      const message = err instanceof Error ? err.message : String(err);
      console.error('Email sending failed:', message);
    }

    return updated;
  }

  // ── ROUTE 5: Delete Order ──────────────────────────────────────────────
  async deleteOrder(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    await this.orderRepo.remove(order);
    return { message: `Order ${id} deleted successfully.` };
  }

  // ── ROUTE 6: Create Assignment ─────────────────────────────────────────
  async createAssignment(dto: CreateAssignmentDto, salesExecId: number) {
    const salesExec = await this.userRepo.findOne({
      where: { id: salesExecId },
    });
    if (!salesExec) {
      throw new HttpException('Sales executive not found.', HttpStatus.NOT_FOUND);
    }

    const customer = await this.userRepo.findOne({
      where: { id: dto.customer_id },
    });
    if (!customer) {
      throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
    }

    const assignment = this.assignmentRepo.create({
      salesExecutive: salesExec,
      customer,
      region: dto.region,
    });

    return await this.assignmentRepo.save(assignment);
  }

  // ── ROUTE 7: Get All Assignments ───────────────────────────────────────
  async getAllAssignments() {
    return await this.assignmentRepo.find({
      relations: {                  // ← FIX 3
        salesExecutive: true,
        customer: true,
      },
    });
  }
}