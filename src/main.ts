import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DoctorService } from './doctors/doctor.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const doctorService = app.get(DoctorService);
  await doctorService.createSampleDoctors();
  await app.listen(3001);
}
bootstrap();
