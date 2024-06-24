import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { Request } from 'express';
import { Staff } from './staff.entity';
import { StaffRepository } from './staff.repository';
config();

const key: string = process.env.SECRET_KEY;

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private staffRepository: StaffRepository,
  ) {}

  private extractToken(req: Request): string | undefined {
    const token: string = req.headers.authorization?.split(' ')[1];

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = this.extractToken(request);
    if (!token) {
      return false;
    } else {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: key,
        });
        const data: Staff = await this.staffRepository.findOne({
          where: { email: payload },
        });

        if (data) {
          request['user'] = data;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log('error', error);
        return false;
      }
    }
  }
}
