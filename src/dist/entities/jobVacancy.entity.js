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
exports.JobVacancy = void 0;
const typeorm_1 = require("typeorm");
const application_entity_1 = require("./application.entity");
const location_entity_1 = require("./location.entity");
let JobVacancy = class JobVacancy {
    id;
    title;
    description;
    seniorityLevel;
    workModality;
    company;
    salaryRange;
    softSkills;
    maximumApplications;
    createdAt;
    updatedAt;
    deletedAt;
    location;
    jobVacancyUsers;
};
exports.JobVacancy = JobVacancy;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobVacancy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar', length: '70' }),
    __metadata("design:type", String)
], JobVacancy.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", String)
], JobVacancy.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seniority_level', type: 'varchar', length: 70 }),
    __metadata("design:type", String)
], JobVacancy.prototype, "seniorityLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_modality', type: 'varchar', length: 60 }),
    __metadata("design:type", String)
], JobVacancy.prototype, "workModality", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company', type: 'varchar', length: 60 }),
    __metadata("design:type", String)
], JobVacancy.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salary_range', type: 'float' }),
    __metadata("design:type", Number)
], JobVacancy.prototype, "salaryRange", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'soft_skills', type: 'varchar', length: 60 }),
    __metadata("design:type", String)
], JobVacancy.prototype, "softSkills", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_aplications', type: 'integer' }),
    __metadata("design:type", Number)
], JobVacancy.prototype, "maximumApplications", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], JobVacancy.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], JobVacancy.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamptz' }),
    __metadata("design:type", Object)
], JobVacancy.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, (location) => location.jobVacancies, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'location_id' }),
    __metadata("design:type", location_entity_1.Location)
], JobVacancy.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_entity_1.JobVacancyUser, (jobVacancyUser) => jobVacancyUser.jobVacancy),
    __metadata("design:type", Array)
], JobVacancy.prototype, "jobVacancyUsers", void 0);
exports.JobVacancy = JobVacancy = __decorate([
    (0, typeorm_1.Entity)('job_vacancies'),
    (0, typeorm_1.Index)('IDX_JOB_VACANCY', ['title'], { unique: true })
], JobVacancy);
//# sourceMappingURL=jobVacancy.entity.js.map