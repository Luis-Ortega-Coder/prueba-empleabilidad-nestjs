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
exports.JobVacancyUser = void 0;
const typeorm_1 = require("typeorm");
const jobVacancy_entity_1 = require("./jobVacancy.entity");
const auth_entity_1 = require("./auth.entity");
let JobVacancyUser = class JobVacancyUser {
    id;
    createdAt;
    updatedAt;
    deletedAt;
    jobVacancy;
    access;
};
exports.JobVacancyUser = JobVacancyUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobVacancyUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], JobVacancyUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], JobVacancyUser.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamptz' }),
    __metadata("design:type", Object)
], JobVacancyUser.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jobVacancy_entity_1.JobVacancy, (jobVacancy) => jobVacancy.jobVacancyUsers, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'job_vacancy_id' }),
    __metadata("design:type", jobVacancy_entity_1.JobVacancy)
], JobVacancyUser.prototype, "jobVacancy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.Access, (access) => access.jobVacancyUsers, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'access_id' }),
    __metadata("design:type", auth_entity_1.Access)
], JobVacancyUser.prototype, "access", void 0);
exports.JobVacancyUser = JobVacancyUser = __decorate([
    (0, typeorm_1.Entity)('job_vacancy_users'),
    (0, typeorm_1.Index)('IDX_JOB_VACANCY_USERS', ['jobVacancy', 'access'], { unique: true })
], JobVacancyUser);
//# sourceMappingURL=application.entity.js.map