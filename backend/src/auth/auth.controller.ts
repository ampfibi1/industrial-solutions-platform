import {Body,Controller,Post,Res,UsePipes,ValidationPipe} from "@nestjs/common";
import type { Response } from "express";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("login")
  @UsePipes(new ValidationPipe({whitelist: true,transform: true}),)
  async login(@Body() dto: LoginDto,@Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(dto);

    response.cookie("access_token", result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return {
      user: result.user,
    };
  }

  @Post("reg")
  @UsePipes(new ValidationPipe({whitelist: true,transform: true}))
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}