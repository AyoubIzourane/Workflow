import { VersionService } from './version.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Version } from './interface/version';
import { UpdateVersionWithDetailsDto } from './dto/update-version-with-details.dto';
export declare class VersionController {
    private readonly versionService;
    constructor(versionService: VersionService);
    findAll(): Promise<Version[]>;
    findOne(id: number): Promise<Version>;
    create(createVersionDto: CreateVersionDto): Promise<Version>;
    update(id: number, updateVersionDto: UpdateVersionDto): Promise<Version>;
    remove(id: number): Promise<void>;
    getVersionsByWorkflowId(workflowId: number): Promise<Version[]>;
    updateVersionWithDetails(id: number, updateVersionWithDetailsDto: UpdateVersionWithDetailsDto): Promise<Version>;
}
