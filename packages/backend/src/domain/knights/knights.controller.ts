import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { KnightsService } from './knights.service';
import { RequestKnightCreateDto } from './dto/create.dto';
import { RequestKnightUpdateDto } from './dto/update.dto';

@Controller('knight')
export class KnightsController {
  constructor(private readonly appService: KnightsService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: RequestKnightCreateDto) {
    return await this.appService.create(body);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('filter') filter: string) {
    return await this.appService.findAll(filter);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return await this.appService.findById(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.appService.delete(id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() body: RequestKnightUpdateDto) {
    return await this.appService.update(id, body);
  }
}
