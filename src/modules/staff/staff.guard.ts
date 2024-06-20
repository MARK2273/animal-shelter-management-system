import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { Request } from 'express';
import { StaffService } from './staff.service';
import { Staff } from './staff.entity';
config();

const key: string = process.env.SECRET_KEY;

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private staffService: StaffService,
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
        const data: Staff = await this.staffService.findStaffByEmail(
          payload.email,
        );
        console.log(data);

        if (data) {
          request['user'] = data;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
}
