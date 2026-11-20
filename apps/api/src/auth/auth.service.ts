import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) {}

  async register(name: string, email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    return this.prisma.db.orm.public.User
      .select('id', 'email', 'name', 'createdAt', 'updatedAt')
      .create({
        name,
        email,
        passwordHash,
      });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.db.orm.public.User
      .where({ email })
      .first();

    if (!user) {
      throw new NotFoundException('User not found'); // HTTP 404
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password'); // HTTP 400 (ou UnauthorizedException para 401)
    }

    // Evita devolver passwordHash na resposta
    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }
}
