// import { Controller, Post ,Get} from '@nestjs/common';
// import { Body } from '@nestjs/common/decorators';
// import { Param } from '@nestjs/common/decorators';
// import { AttendanceService } from './attendance.service';
// import { Attendance } from './attendance.entity';
// @Controller('attendance')
// export class AttendanceController {
//     constructor(private attendanceService:AttendanceService){}

//     @Post('mark')
//     mark(@Body() record:Attendance){
//         return this.attendanceService.markAttendance(record);
//     }

//     @Get(':id')
//     view(@Param('id') studentId:number){
//         return this.attendanceService.getAttendanceByStudent(studentId);
//     }
// }
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { RoleGuard } from '../roles/role.guard';
import { Role } from '../roles/role.enum';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('mark')
  @UseGuards(new RoleGuard([Role.TEACHER]))
  mark(@Body() record: Attendance) {
    return this.attendanceService.markAttendance(record);
  }

  @Get()
  @UseGuards(new RoleGuard([Role.STUDENT]))
  view(@Request() req) {
    const studentId = req.user.id;
    return this.attendanceService.getAttendanceByStudent(studentId);
  }

  @Get('all')
  @UseGuards(new RoleGuard([Role.TEACHER]))
  viewAll() {
    return this.attendanceService.getAllAttendance();
  }
}
