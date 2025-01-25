import { Body, Controller, Get, Post } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { RequestKnightCreateDto } from './dto/create.dto';

@Controller('knight')
export class KnightsController {
  constructor(private readonly appService: KnightsService) {}

  @Post('')
  create(@Body() body: RequestKnightCreateDto) {
    return this.appService.create(body);
  }
}
