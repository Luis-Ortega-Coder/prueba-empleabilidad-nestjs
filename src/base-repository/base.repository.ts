import { Repository, SelectQueryBuilder, DataSource, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { Injectable } from '@nestjs/common';

interface QueryParams<T> {
  filters?: Partial<Record<keyof T, any>>;
  relations?: string[];
  select?: (keyof T)[];
  order?: { [P in keyof T]?: 'ASC' | 'DESC' };
  skip?: number;
  take?: number;
}

@Injectable()
export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {

  constructor(private dataSource: DataSource, entity: { new (): T }) {
    super(entity, dataSource.createEntityManager());
  }

  
  private buildQuery(params?: QueryParams<T>): SelectQueryBuilder<T> {
    const alias = 'entity';
    let qb = this.createQueryBuilder(alias);

   
    if (params?.relations?.length) {
      params.relations.forEach((rel) => {
        qb = qb.leftJoinAndSelect(`${alias}.${rel}`, rel);
      });
    }

   
    if (params?.select?.length) {
      qb = qb.select(params.select.map((f) => `${alias}.${String(f)}`));
    }

    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value], index) => {
        const paramName = `filter_${key}_${index}`;
        if (Array.isArray(value)) {
          qb.andWhere(`${alias}.${key} IN (:...${paramName})`, { [paramName]: value });
        } else if (value === null) {
          qb.andWhere(`${alias}.${key} IS NULL`);
        } else {
          qb.andWhere(`${alias}.${key} = :${paramName}`, { [paramName]: value });
        }
      });
    }

    
    if (params?.order) {
      Object.entries(params.order).forEach(([key, value]) => {
        qb.addOrderBy(`${alias}.${key}`, value as 'ASC' | 'DESC');
      });
    }

    
    if (params?.skip) qb = qb.skip(params.skip);
    if (params?.take) qb = qb.take(params.take);

    return qb;
  }

 
  async findWithQuery(params?: QueryParams<T>): Promise<T[]> {
    const qb = this.buildQuery(params);
    return qb.getMany();
  }

  
  async findOneWithQuery(params?: QueryParams<T>): Promise<T | null> {
    const qb = this.buildQuery(params);
    return qb.getOne();
  }

  
  async countWithQuery(params?: QueryParams<T>): Promise<number> {
    const qb = this.buildQuery(params);
    return qb.getCount();
  }

  
  async findWithSubquery<R extends ObjectLiteral>(
  subQuery: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<R>,
  params?: QueryParams<T>,
): Promise<T[]> {
  const qb = this.buildQuery(params);
  qb.addSelect((sub) => subQuery(sub), 'subquery');
  return qb.getMany();
}}
