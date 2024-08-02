import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctors/doctor.entity';
import { Appointment } from './appointments/appointment.entity';
import { DoctorService } from './doctors/doctor.service';
import { DoctorController } from './doctors/doctor.controller';
import { AppointmentService } from './appointments/appointment.service';
import { AppointmentController } from './appointments/appointment.controller';

import { DoctorModule } from './doctors/doctor.module';
import { AppointmentModule } from './appointments/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Doctor, Appointment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Doctor, Appointment]),
    DoctorModule,
    AppointmentModule,
  ],
})
export class AppModule {}
