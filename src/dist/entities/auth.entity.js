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
exports.Access = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./role.entity");
const user_entity_1 = require("./user.entity");
const application_entity_1 = require("./application.entity");
let Access = class Access {
    id;
    email;
    password;
    createdAt;
    updatedAt;
    deletedAt;
    role;
    user;
    jobVacancyUsers;
};
exports.Access = Access;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Access.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 60 }),
    __metadata("design:type", String)
], Access.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], Access.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Access.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Access.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamptz' }),
    __metadata("design:type", Object)
], Access.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.accesses, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.Role)
], Access.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.accesses, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Access.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_entity_1.JobVacancyUser, (jobVacancyUser) => jobVacancyUser.access),
    __metadata("design:type", Array)
], Access.prototype, "jobVacancyUsers", void 0);
exports.Access = Access = __decorate([
    (0, typeorm_1.Entity)('access'),
    (0, typeorm_1.Index)('IDX_UNIQUE_ACCESS', ['email'], { unique: true })
], Access);
//# sourceMappingURL=auth.entity.js.map