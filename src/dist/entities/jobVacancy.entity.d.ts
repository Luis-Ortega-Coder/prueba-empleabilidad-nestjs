import { JobVacancyUser } from './application.entity';
import { Location } from './location.entity';
export declare class JobVacancy {
    id: number;
    title: string;
    description: string;
    seniorityLevel: string;
    workModality: string;
    company: string;
    salaryRange: number;
    softSkills: string;
    maximumApplications: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    location: Location;
    jobVacancyUsers: JobVacancyUser[];
}
