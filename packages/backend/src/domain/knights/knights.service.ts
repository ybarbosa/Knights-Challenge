import { Injectable } from '@nestjs/common';
import { RequestKnightCreateDto } from './dto/create.dto';

@Injectable()
export class KnightsService {
  async create(body: RequestKnightCreateDto) {}
}
