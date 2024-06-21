import { Repository } from 'typeorm';
import { Node } from './interface/Node';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
export declare class NodeService {
    private readonly nodeRepository;
    constructor(nodeRepository: Repository<Node>);
    findAll(): Promise<Node[]>;
    findOne(id: number): Promise<Node>;
    create(createNodeDto: CreateNodeDto): Promise<Node>;
    update(id: number, updateNodeDto: UpdateNodeDto): Promise<Node>;
    remove(id: number): Promise<void>;
    findByVersionId(versionId: number): Promise<Node[]>;
}
