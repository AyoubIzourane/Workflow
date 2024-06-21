import { Connection } from 'typeorm';
export declare class AppService {
    private readonly connection;
    constructor(connection: Connection);
    getHello(): string;
    getTables(): Promise<string[]>;
}
