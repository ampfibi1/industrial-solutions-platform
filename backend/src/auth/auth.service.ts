import {
  Injectable,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../db/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
 
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
 
  // ── REGISTER (BCrypt hashes password) 
  async register(dto: RegisterDto) {
    // Check if email already exists
    const existing = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered.');
    }
 
    // BCrypt — hash the password before saving
    const hashedPassword = await bcrypt.hash(dto.password, 10);
 
    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,   // ← save hashed password
      phone: dto.phone,
      role: dto.role,
    });
 
    await this.userRepo.save(user);
 
    return {
      message: 'User registered successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
 
  // ── LOGIN (BCrypt compares password) 
  async login(dto: LoginDto) {
    // Find user by email
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });
 
    // HttpException — throw proper error if user not found
    if (!user) {
      throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
    }
 
    // BCrypt — compare entered password with hashed password
    if (!user.password) {
      throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
    }
 
    // Generate JWT token
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
 
    return {
      message: 'Login successful.',
      access_token: token,    // ← return token to user
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}