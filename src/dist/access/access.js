"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessService = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("../base-repository/base.repository");
const auth_entity_1 = require("../entities/auth.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
let AccessService = class AccessService {
    accessRepository;
    constructor(accessRepository) {
        this.accessRepository = accessRepository;
    }
    async login(dto) {
        const { email, password } = dto;
        const access = await this.accessRepository.findOne({ where: { email } });
        if (!access) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(password, access.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return {
            id: access.id,
            email: access.email,
            role: access.role,
        };
    }
    async isAccessActive(dto) {
        const { accessId } = dto;
        const access = await this.accessRepository.findOne({
            where: { id: accessId, deletedAt: (0, typeorm_2.IsNull)() },
            select: ['id'],
        });
        return !!access;
    }
    async getUserAccesses(userId, paginationDto) {
        const { offset, limit } = paginationDto;
        return this.accessRepository.find({
            where: { user: { id: userId }, deletedAt: (0, typeorm_2.IsNull)() },
            take: limit,
            skip: offset,
            order: { createdAt: 'DESC' },
        });
    }
    async revokeAccess(dto) {
        const { accessId } = dto;
        const access = await this.accessRepository.findOne({
            where: { id: accessId, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (!access) {
            throw new common_1.NotFoundException('Access not found');
        }
        access.deletedAt = new Date();
        await this.accessRepository.save(access);
    }
    async getAccessContext(dto) {
        const { accessId } = dto;
        const access = await this.accessRepository.findOne({
            where: { id: accessId, deletedAt: (0, typeorm_2.IsNull)() },
            select: ['id', 'email', 'role', 'user'],
        });
        if (!access) {
            throw new common_1.NotFoundException('Access not found');
        }
        return access;
    }
};
exports.AccessService = AccessService;
exports.AccessService = AccessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Access)),
    __metadata("design:paramtypes", [base_repository_1.BaseRepository])
], AccessService);
//# sourceMappingURL=access.js.map