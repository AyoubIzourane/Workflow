import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { DashboardController } from './admin/dashboard/dashboard.controller';
import { DashboardService } from './admin/dashboard/dashboard.service';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { UsersModule } from './admin/users/users.module';
import { EntitePrimaireModule } from './admin/entitePrimaire/entitePrimaire.module';
import { VersionModule } from './admin/version/version.module';
import { NodeModule } from './admin/version/details/Node/node.module';
import { LinkModule } from './admin/version/details/Link/link.module';
import { ElementModule } from './admin/version/details/Element/element.module';
import { FormulaireModule } from './admin/version/details/Formulaire/formulaire.module';
import { WorkflowModule } from './admin/workflow/workflow.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './auth/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ayoub',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,//only in dev mode
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'suppapp415@gmail.com',
          pass: 'ojznjgpiivbeburl',
        },
      },
    }),
    AuthModule,
    PassportModule,
    JwtModule.register({ secret: 'secrete', signOptions: { expiresIn: '1h' } }),
    DashboardModule,
    UsersModule,
    EntitePrimaireModule,
    WorkflowModule,
    VersionModule,
    NodeModule,
    LinkModule,
    ElementModule,
    FormulaireModule,
  ],
  controllers: [AppController, DashboardController],
  providers: [AppService, JwtStrategy, DashboardService,MailService],
})
export class AppModule {}
