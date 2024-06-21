import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class AppService {
  constructor(

    @InjectConnection()
    private readonly connection: Connection
    ){}
  getHello(): string {
    return 'Backend server works!';
  }
  async getTables(): Promise<string[]> {

      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();

      const tables = await queryRunner.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name NOT IN ('user', 'workflow', 'entite_primaire', 'version',
        'formulaire','element','nodeDataArray','linkDataArray')
        AND table_type = 'BASE TABLE';
      `);
      await queryRunner.release();
      const tableNames = tables.map((table: { table_name: string }) => table.table_name);
      return tableNames;
   
  }
}
