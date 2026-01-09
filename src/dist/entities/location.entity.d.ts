import { User } from './user.entity';
import { JobVacancy } from './jobVacancy.entity';
export declare class Location {
    id: number;
    city: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    users: User[];
    jobVacancies: JobVacancy[];
}
