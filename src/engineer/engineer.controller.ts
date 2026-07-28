import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
} from '@nestjs/common';

import { EngineerService } from './engineer.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceStatusDto } from './dto/update-service-status.dto';

@Controller('engineer')
export class EngineerController {

  constructor(
    private readonly engineerService: EngineerService,
  ) {}


  @Post('service-request')
  createServiceRequest(
    @Body() createServiceRequestDto: CreateServiceRequestDto,
  ) {
    return this.engineerService.createServiceRequest(
      createServiceRequestDto,
    );
  }


  @Get('service-request/:engineerId')
getAssignedRequests(
  @Param('engineerId') engineerId: string,
) {
  return this.engineerService.getAssignedRequests(
    Number(engineerId),
  );
}


  @Patch('service-request/:id')
  updateStatus(
    @Param('id') id: number,
    @Body() updateServiceStatusDto: UpdateServiceStatusDto,
  ) {
    return this.engineerService.updateStatus(
      id,
      updateServiceStatusDto,
    );
  }

}