import { Injectable } from '@nestjs/common';
import { Attendance } from './attendance.entity';
@Injectable()
export class AttendanceService {
  private attendances: Attendance[] = [];

  constructor() {
    // Add some sample data for testing
    this.attendances = [
      { studentId: 1, date: '2026-01-01', status: 'present' },
      { studentId: 1, date: '2026-01-02', status: 'absent' },
      { studentId: 2, date: '2026-01-01', status: 'present' },
    ];
  }

  markAttendance(record: Attendance) {
    this.attendances.push(record);
    return record;
  }

  getAttendanceByStudent(studentId: number) {
    return this.attendances.filter((att) => att.studentId === studentId);
  }

  getAllAttendance() {
    return this.attendances;
  }
}
