import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './features/auth/auth.module';
import { RoleModule } from './features/role/role.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      envFilePath: '.env',
    }),
    DatabaseModule,
    RoleModule,
    UserModule,
    AuthModule,
    // UserProfileModule,
    // ProductModule,
    // CartModule,
    // OrderModule,
    // ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
