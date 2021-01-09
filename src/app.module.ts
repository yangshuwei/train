import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';
import {LoginService} from './login.service'



@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService,LoginService,TasksService],
})
export class AppModule {}
