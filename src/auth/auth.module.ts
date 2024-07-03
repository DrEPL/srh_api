import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
          return {
            secret: config.get<string>('JWT_SECRET'),
            signOptions: {expiresIn: <string | number>config.get('JWT_DELAY')}
          }
      },
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
