import { BaseRepository } from '../base-repository/base.repository';
import { Access } from '../entities/auth.entity';
import { LoginAccessDto } from './dto/login-access.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AccessIdDto } from './dto/access-id.dto';
export declare class AccessService {
    private readonly accessRepository;
    constructor(accessRepository: BaseRepository<Access>);
    login(dto: LoginAccessDto): Promise<Partial<Access>>;
    isAccessActive(dto: AccessIdDto): Promise<boolean>;
    getUserAccesses(userId: number, paginationDto: PaginationDto): Promise<Access[]>;
    revokeAccess(dto: AccessIdDto): Promise<void>;
    getAccessContext(dto: AccessIdDto): Promise<Partial<Access>>;
}
