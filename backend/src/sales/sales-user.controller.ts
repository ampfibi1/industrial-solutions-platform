import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SalesUserService } from './sales-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';


@Controller('api/sales/users')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class SalesUserController {

  constructor(private readonly salesUserService: SalesUserService) {}

 
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.salesUserService.createUser(dto);
  }


  @Patch(':id/phone')
  updatePhone(
    @Param('id') id: string,
    @Body() dto: UpdatePhoneDto,
  ) {
    return this.salesUserService.updatePhone(id, dto);
  }


  @Get('null-name')
  getUsersWithNullFullName() {
    return this.salesUserService.getUsersWithNullFullName();
  }

  
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.salesUserService.removeUser(id);
  }
}