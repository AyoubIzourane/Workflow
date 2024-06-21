import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './interface/Link';
import { VersionModule } from '../../version.module';
import { NodeModule } from '../Node/node.module';

@Module({
    imports: [TypeOrmModule.forFeature([Link]),
NodeModule],
    controllers: [LinkController],
    providers: [LinkService],
    exports: [TypeOrmModule],
})
export class LinkModule {}
