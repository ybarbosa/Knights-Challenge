import { Controller, Get, Post } from '@nestjs/common';
import { KnightsService } from './knights.service';

@Controller()
export class KnightsController {
  constructor(private readonly appService: KnightsService) {}

  @Post()
  create() {
    return false;
  }
}
