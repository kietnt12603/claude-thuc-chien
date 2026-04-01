import { Injectable } from '@nestjs/common';
import { DataSource, Repository, LessThan } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(private dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    return this.findOne({
      where: {
        token_hash: tokenHash,
        is_revoked: false,
      },
      relations: ['user', 'user.role'],
    });
  }

  async revokeAllByUserId(userId: number): Promise<void> {
    await this.update(
      { user_id: userId, is_revoked: false },
      { is_revoked: true },
    );
  }

  async deleteExpired(): Promise<void> {
    await this.delete({
      expires_at: LessThan(new Date()),
    });
  }
}
