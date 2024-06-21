import { Module } from '@nestjs/common';
import { NodeController } from './node.controller';
import { NodeService } from './node.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './interface/Node';

@Module({
    imports: [TypeOrmModule.forFeature([Node])],
    controllers: [NodeController],
    providers: [NodeService],
    exports: [TypeOrmModule],
})
export class NodeModule {}
