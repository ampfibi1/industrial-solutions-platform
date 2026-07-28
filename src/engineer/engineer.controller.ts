import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';

import { EngineerService } from './engineer.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceStatusDto } from './dto/update-service-status.dto';
import { CreateExpertiseDto } from './dto/create-expertise.dto';

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

    @Post('expertise')
    createExpertise(
        @Body() createExpertiseDto: CreateExpertiseDto,
    ) {
        return this.engineerService.createExpertise(
            createExpertiseDto,
        );
    }


    @Get('expertise/:engineerId')
    getExpertise(
        @Param('engineerId') engineerId: string,
        ) {
            return this.engineerService.getExpertise(
                Number(engineerId),
        );
    }


    @Delete('expertise/:id')
    deleteExpertise(
        @Param('id') id: string,
        ) {
             return this.engineerService.deleteExpertise(
                 Number(id),
        );
    }

}