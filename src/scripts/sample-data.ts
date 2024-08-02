import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DoctorService } from '../doctors/doctor.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const doctorService = app.get(DoctorService);
  // Save sample doctors
  // console.log('Sample data added');
  await app.close();
}

bootstrap();
