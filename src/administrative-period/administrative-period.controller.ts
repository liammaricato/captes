import { Body, Controller, Get, Post } from "@nestjs/common";

import { AdministrativePeriodService } from "./administrative-period.service";

@Controller('administrative-period')
export class AdministrativePeriodController {
  constructor(private readonly administrativePeriodService: AdministrativePeriodService) {}

  @Post()
  async addAdministrativePeriod(
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
    @Body('number') number: number
  ) {
    return await this.administrativePeriodService.insertAdministrativePeriod(startDate, endDate, number);
  }

  @Get()
  async getAllAdministrativePeriods() {
    return await this.administrativePeriodService.getAdministrativePeriods();
  }
}
