import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { EngineerService } from './engineer.service';
import { CreateExpertiseDto } from './dto/create-expertise.dto';
import { UpdateServiceStatusDto } from './dto/update-service-status.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../db/enums/role.enum';

type AuthenticatedRequest = {
  user: { id: number };
};

@Controller('engineer')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ENGINEER)
export class EngineerController {
  constructor(private readonly engineerService: EngineerService) {}

  @Get('profile')
  getProfile(@Req() req: AuthenticatedRequest) {
    const user = req.user;

    return this.engineerService.getProfile(user.id);
  }

  @Put('profile')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateProfileDto,
  ) {
    const user = req.user;

    return this.engineerService.updateProfile(
      user.id,
      dto.name,
      dto.phone,
    );
  }

  @Get('service-request')
  getServiceRequests(@Req() req: AuthenticatedRequest) {
    const user = req.user;

    return this.engineerService.getServiceRequests(user.id);
  }
    @Get('available-service-requests')
  getAvailableServiceRequests() {
    return this.engineerService.getAvailableServiceRequests();
  }

  @Post('service-request/:id/apply')
  applyForServiceRequest(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const user = req.user;

    return this.engineerService.applyForServiceRequest(
      user.id,
      Number(id),
    );
  }
  @Get('service-request/:id')
  getServiceRequest(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const user = req.user;

    return this.engineerService.getServiceRequest(
      user.id,
      Number(id),
    );
  }

  @Patch('service-request/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  updateServiceStatus(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateServiceStatusDto,
  ) {
    const user = req.user;

    return this.engineerService.updateServiceStatus(
      user.id,
      Number(id),
      dto,
    );
  }

  @Post('expertise')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  addExpertise(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateExpertiseDto,
  ) {
    const user = req.user;

    return this.engineerService.addExpertise(
      user.id,
      dto.product_id,
    );
  }

  @Get('expertise')
  getExpertise(@Req() req: AuthenticatedRequest) {
    const user = req.user;

    return this.engineerService.getExpertise(user.id);
  }

  @Delete('expertise/:id')
  removeExpertise(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const user = req.user;

    return this.engineerService.removeExpertise(
      user.id,
      Number(id),
    );
  }
}