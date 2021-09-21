import { Module } from '@nestjs/common';
import { AdministrativePeriodService } from './administrative-period.service';
import { AdministrativePeriodController } from './administrative-period.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministrativePeriodSchema } from './administrative-period.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AdministrativePeriod', schema: AdministrativePeriodSchema }])
  ],
  controllers: [AdministrativePeriodController],
  providers: [AdministrativePeriodService]
})
export class AdministrativePeriodModule {}
