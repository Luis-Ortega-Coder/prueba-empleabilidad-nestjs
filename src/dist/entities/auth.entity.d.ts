import { Role } from './role.entity';
import { User } from './user.entity';
import { JobVacancyUser } from './application.entity';
export declare class Access {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    role: Role;
    user: User;
    jobVacancyUsers: JobVacancyUser[];
}
