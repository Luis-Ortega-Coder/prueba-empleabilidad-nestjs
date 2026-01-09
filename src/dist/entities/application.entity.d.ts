import { JobVacancy } from './jobVacancy.entity';
import { Access } from './auth.entity';
export declare class JobVacancyUser {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    jobVacancy: JobVacancy;
    access: Access;
}
