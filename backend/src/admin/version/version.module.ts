import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { Version } from './interface/version';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementModule } from './details/Element/element.module';
import { NodeModule } from './details/Node/node.module';
import { LinkModule } from './details/Link/link.module';
import { FormulaireModule } from './details/Formulaire/formulaire.module';

@Module({
    imports:[TypeOrmModule.forFeature([Version]),
  ElementModule,NodeModule,LinkModule,FormulaireModule],
  controllers: [VersionController],
  providers: [VersionService],
  exports: [TypeOrmModule],
})
export class VersionModule {}
