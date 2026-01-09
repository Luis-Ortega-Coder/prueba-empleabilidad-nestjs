import { Repository, SelectQueryBuilder, DataSource, ObjectLiteral } from 'typeorm';
interface QueryParams<T> {
    filters?: Partial<Record<keyof T, any>>;
    relations?: string[];
    select?: (keyof T)[];
    order?: {
        [P in keyof T]?: 'ASC' | 'DESC';
    };
    skip?: number;
    take?: number;
}
export declare class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
    private dataSource;
    constructor(dataSource: DataSource, entity: {
        new (): T;
    });
    private buildQuery;
    findWithQuery(params?: QueryParams<T>): Promise<T[]>;
    findOneWithQuery(params?: QueryParams<T>): Promise<T | null>;
    countWithQuery(params?: QueryParams<T>): Promise<number>;
    findWithSubquery<R extends ObjectLiteral>(subQuery: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<R>, params?: QueryParams<T>): Promise<T[]>;
}
export {};
