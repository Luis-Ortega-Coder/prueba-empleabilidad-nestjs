import { AccessRepository } from './access.repository';
export declare class AccessService {
    private readonly accessRepository;
    constructor(accessRepository: AccessRepository);
    validateCredentials(email: string, plainPassword: string): Promise<{
        id: number;
        email: string;
    }>;
    getAccessContext(accessId: number): Promise<{
        accessId: number;
        email: string;
        role: {
            id: number;
            name: string;
        };
        user: {
            id: number;
            firstName: string;
            lastName: string;
        };
    }>;
    isAccessActive(accessId: number): Promise<boolean>;
    getUserAccesses(userId: number, limit?: number, offset?: number): Promise<import("../entities").Access[]>;
    revokeAccess(accessId: number): Promise<void>;
}
