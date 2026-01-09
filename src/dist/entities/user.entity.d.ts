import { Access } from './auth.entity';
import { Location } from './location.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    location: Location;
    accesses: Access[];
}
