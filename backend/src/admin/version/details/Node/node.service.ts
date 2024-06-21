import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from './interface/Node';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';

@Injectable()
export class NodeService {
    constructor(
        @InjectRepository(Node)
        private readonly nodeRepository: Repository<Node>,
    ){}

    async findAll(): Promise<Node[]> {
        return this.nodeRepository.find({
            relations: [] // Update relation names
        });
    }    

    async findOne(id: number): Promise<Node> {
        const node = await this.nodeRepository.findOne({
            relations: [], // Update relation names
            where: { id }
        });
        if (!node) {
            throw new NotFoundException(`Node with ID ${id} not found`);
        }
        return node;
    }  
    
    async create(createNodeDto: CreateNodeDto) {
        const newNode = this.nodeRepository.create(createNodeDto);
        return this.nodeRepository.save(newNode);
    }

    async update(id: number, updateNodeDto: UpdateNodeDto) {
        const node = await this.nodeRepository.preload({
            id: +id,
            ...updateNodeDto,
        });
        if (!node) {
            throw new NotFoundException(`Node with ID ${id} not found`);
        }
        return this.nodeRepository.save(node);
    }

    async remove(id: number) {
        const node = await this.nodeRepository.findOne({
            relations: [],
            where: { id }
        });
        if (!node) {
            throw new NotFoundException(`Node with ID ${id} not found`);
        }
        await this.nodeRepository.delete(id);
    }
    async findByVersionId(versionId: number): Promise<Node[]> {
        return this.nodeRepository.createQueryBuilder('node')
            .leftJoinAndSelect('node.version', 'version')
            .where('version.id = :versionId', { versionId })
            .getMany();
    }
}
