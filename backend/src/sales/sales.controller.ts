import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('api/sales')
@UseGuards(JwtAuthGuard)          // ← JWT protects ALL routes
@UsePipes(new ValidationPipe({ whitelist: true }))
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  // ROUTE 1: POST /api/sales/orders 
  // Create a new order
  @Post('orders')
  createOrder(@Body() dto: CreateOrderDto, @Request() req) {
    return this.salesService.createOrder(dto, req.user.id);
  }

  // ROUTE 2: GET /api/sales/orders 
  // Get all orders
  @Get('orders')
  getAllOrders() {
    return this.salesService.getAllOrders();
  }

  // ROUTE 3: GET /api/sales/orders/:id 
  // Get one order by id
  @Get('orders/:id')
  getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.salesService.getOrderById(id);
  }

  // ROUTE 4: PATCH /api/sales/orders/:id 
  // Update order status
  @Patch('orders/:id')
  updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.salesService.updateOrderStatus(id, dto);
  }

  // ROUTE 5: DELETE /api/sales/orders/:id 
  // Delete an order
  @Delete('orders/:id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.salesService.deleteOrder(id);
  }

  // ROUTE 6: POST /api/sales/assignments 
  // Create a sales assignment
  @Post('assignments')
  createAssignment(@Body() dto: CreateAssignmentDto, @Request() req) {
    return this.salesService.createAssignment(dto, req.user.id);
  }

  //  ROUTE 7: GET /api/sales/assignments 
  // Get all assignments
  @Get('assignments')
  getAllAssignments() {
    return this.salesService.getAllAssignments();
  }
}