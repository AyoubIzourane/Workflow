import { Module } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { Workflow} from './interface/workflow';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitePrimaireModule } from '../entitePrimaire/entitePrimaire.module';
import { VersionModule } from '../version/version.module';

@Module({
    imports:[TypeOrmModule.forFeature([Workflow]),
             EntitePrimaireModule,VersionModule],
  controllers: [WorkflowController],
  providers: [WorkflowService]
})
export class WorkflowModule {}
