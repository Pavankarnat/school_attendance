// import { Module } from '@nestjs/common';
// import { AttendanceService } from './attendance.service';
// import { AttendanceController } from './attendance.controller';

// @Module({
//   providers: [AttendanceService],
//   controllers: [AttendanceController]
// })
// export class AttendanceModule {}
import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
