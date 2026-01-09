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
exports.AccessRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const base_repository_1 = require("../base-repository/base.repository");
const auth_entity_1 = require("../entities/auth.entity");
let AccessRepository = class AccessRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(dataSource, auth_entity_1.Access);
    }
    async findForLogin(email) {
        return this.createQueryBuilder('access')
            .select([
            'access.id',
            'access.email',
            'access.password',
        ])
            .where('access.email = :email', { email })
            .andWhere('access.deleted_at IS NULL')
            .limit(1)
            .getOne();
    }
    async findWithRoleAndUser(accessId) {
        return this.createQueryBuilder('access')
            .select([
            'access.id',
            'access.email',
            'role.id',
            'role.name',
            'user.id',
            'user.firstName',
            'user.lastName',
        ])
            .innerJoin('access.role', 'role')
            .innerJoin('access.user', 'user')
            .where('access.id = :id', { id: accessId })
            .andWhere('access.deleted_at IS NULL')
            .limit(1)
            .getOne();
    }
    async existsActiveAccess(accessId) {
        const result = await this.createQueryBuilder('access')
            .select('1')
            .where('access.id = :id', { id: accessId })
            .andWhere('access.deleted_at IS NULL')
            .limit(1)
            .getRawOne();
        return !!result;
    }
    async findByUserId(userId, limit = 20, offset = 0) {
        return this.createQueryBuilder('access')
            .select([
            'access.id',
            'access.email',
            'access.createdAt',
        ])
            .where('access.user_id = :userId', { userId })
            .andWhere('access.deleted_at IS NULL')
            .orderBy('access.created_at', 'DESC')
            .limit(limit)
            .offset(offset)
            .getMany();
    }
    async softDeleteById(accessId) {
        await this.createQueryBuilder()
            .update(auth_entity_1.Access)
            .set({ deletedAt: () => 'NOW()' })
            .where('id = :id', { id: accessId })
            .andWhere('deleted_at IS NULL')
            .execute();
    }
};
exports.AccessRepository = AccessRepository;
exports.AccessRepository = AccessRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AccessRepository);
//# sourceMappingURL=access.repository.js.map