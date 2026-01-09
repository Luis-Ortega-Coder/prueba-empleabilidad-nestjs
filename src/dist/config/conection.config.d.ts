import 'reflect-metadata';
import { DataSource } from 'typeorm';
export declare const AppDataSource: DataSource;
export declare function initializeDataSource(retries?: number, delay?: number): Promise<DataSource | undefined>;
