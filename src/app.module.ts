// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { AttendanceModule } from './attendance/attendance.module';
// import { RolesModule } from './roles/roles.module';
// import { AttendaceController } from './attendace/attendace.controller';

// @Module({
//   imports: [AuthModule, UsersModule, AttendanceModule, RolesModule],
//   controllers: [AppController, AttendaceController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [AttendanceModule, AuthModule, UsersModule, RolesModule],
})
export class AppModule {}
