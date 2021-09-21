import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
const moment = require('moment');

import { AdministrativePeriod } from "./administrative-period.model"

@Injectable()
export class AdministrativePeriodService {
  constructor(
    @InjectModel('AdministrativePeriod') private readonly administrativePeriodModel: Model<AdministrativePeriod>
  ) {}

  async insertAdministrativePeriod(startDate: string, endDate: string, number: number) {
    const newPeriodStartDate = new Date(startDate);
    let newPeriodEndDate = null

    if (endDate) {
      this.finishLastAdministrativePeriod(newPeriodStartDate);
      newPeriodEndDate = new Date(endDate);
    }

    const newAdministrativePeriod = new this.administrativePeriodModel({
      startDate: newPeriodStartDate,
      endDate: newPeriodEndDate,
      number
    });
    return await newAdministrativePeriod.save();
  }

  async getAdministrativePeriods() {
    return await this.administrativePeriodModel.find().exec();
  }

  private async finishLastAdministrativePeriod(newPeriodStartDate: Date) {
    const currentAdministativePeriod = await this.getCurrentAdministrativePeriod();
    currentAdministativePeriod.endDate = moment(newPeriodStartDate).subtract(1, 'days');
    await currentAdministativePeriod.save();
  }

  private async getCurrentAdministrativePeriod(): Promise<AdministrativePeriod> {
    return await this.administrativePeriodModel.findOne({ endDate: null });
  }
}
