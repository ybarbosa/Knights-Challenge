import { Body, Controller, Get, Post } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { RequestKnightCreateDto } from './dto/create.dto';

@Controller('knight')
export class KnightsController {
  constructor(private readonly appService: KnightsService) {}

  @Post('')
  async create(@Body() body: RequestKnightCreateDto) {
    return await this.appService.create(body);
  }
}
