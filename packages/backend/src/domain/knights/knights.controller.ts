import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { RequestKnightCreateDto } from './dto/create.dto';

@Controller('knight')
export class KnightsController {
  constructor(private readonly appService: KnightsService) {}

  @Post('')
  async create(@Body() body: RequestKnightCreateDto) {
    return await this.appService.create(body);
  }

  @Get('')
  async findAll(@Query('filter') filter: string) {
    return await this.appService.findAll(filter);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.appService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.appService.delete(id);
  }
}
