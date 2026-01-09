"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let BaseRepository = class BaseRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource, entity) {
        super(entity, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    buildQuery(params) {
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
                }
                else if (value === null) {
                    qb.andWhere(`${alias}.${key} IS NULL`);
                }
                else {
                    qb.andWhere(`${alias}.${key} = :${paramName}`, { [paramName]: value });
                }
            });
        }
        if (params?.order) {
            Object.entries(params.order).forEach(([key, value]) => {
                qb.addOrderBy(`${alias}.${key}`, value);
            });
        }
        if (params?.skip)
            qb = qb.skip(params.skip);
        if (params?.take)
            qb = qb.take(params.take);
        return qb;
    }
    async findWithQuery(params) {
        const qb = this.buildQuery(params);
        return qb.getMany();
    }
    async findOneWithQuery(params) {
        const qb = this.buildQuery(params);
        return qb.getOne();
    }
    async countWithQuery(params) {
        const qb = this.buildQuery(params);
        return qb.getCount();
    }
    async findWithSubquery(subQuery, params) {
        const qb = this.buildQuery(params);
        qb.addSelect((sub) => subQuery(sub), 'subquery');
        return qb.getMany();
    }
};
exports.BaseRepository = BaseRepository;
exports.BaseRepository = BaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource, Object])
], BaseRepository);
//# sourceMappingURL=base.repository.js.map