import {
    Injectable,
    NotFoundException,
    ForbiddenException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateAccountDto } from './dto/create-account.dto';
  import { UpdateAccountDto } from './dto/update-account.dto';
  
  @Injectable()
  export class AccountsService {
    constructor(private readonly prisma: PrismaService) {}
  
    async create(userId: string, dto: CreateAccountDto) {
      return this.prisma.account.create({
        data: {
          userId,
          name: dto.name,
          currency: dto.currency,
          type: dto.type, // required by Prisma
        },
      });
    }
  
    async findAllForUser(userId: string) {
      return this.prisma.account.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
      });
    }
  
    async findOneForUser(userId: string, id: string) {
      const account = await this.prisma.account.findUnique({
        where: { id },
      });
  
      if (!account) {
        throw new NotFoundException('Account not found');
      }
  
      if (account.userId !== userId) {
        throw new ForbiddenException('You do not have access to this account');
      }
  
      return account;
    }
  
    async update(userId: string, id: string, dto: UpdateAccountDto) {
      await this.findOneForUser(userId, id);
  
      return this.prisma.account.update({
        where: { id },
        data: {
          ...dto,
        },
      });
    }
  
    async remove(userId: string, id: string) {
      await this.findOneForUser(userId, id);
  
      await this.prisma.account.delete({
        where: { id },
      });
  
      return { success: true };
    }
  }
  