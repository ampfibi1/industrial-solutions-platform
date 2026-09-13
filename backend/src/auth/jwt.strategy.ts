<<<<<<< HEAD
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
=======
import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
>>>>>>> tamjid/admin

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
<<<<<<< HEAD
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not set in environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
=======
export class JwtStrategy extends PassportStrategy(
  Strategy,
  "jwt",
) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>("JWT_SECRET");

    if (!secret) {
      throw new Error(
        "JWT_SECRET is not set in environment variables",
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) =>
          request?.cookies?.access_token,
      ]),
>>>>>>> tamjid/admin
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

<<<<<<< HEAD
  // whatever is returned here becomes req.user
  async validate(payload: JwtPayload) {
    if (!payload?.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
=======
  async validate(payload: JwtPayload) {
    if (!payload?.sub) {
      throw new UnauthorizedException(
        "Invalid token payload",
      );
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
>>>>>>> tamjid/admin
