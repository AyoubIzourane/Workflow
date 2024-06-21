import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboardData(): string {
    return 'This is dashboard data';
  }
}
