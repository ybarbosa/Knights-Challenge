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
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

const knightUnFormattedDefault = {
  id: '67953c429cbd1f7a2a503123',
  nickname: 'teste_teste',
  name: 'teste',
  birthday: '1998-01-25T12:00:00.000Z',
  keyAttribute: 'strength',
  weapons: [
    {
      isEquipped: true,
      id: '67953b46c0647da276604ffa',
      name: 'Espada',
      mod: 10,
      attr: 'strength',
    },
  ],
  attributes: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  isHero: false,
};

const knightFormattedDefault = {
  id: '67953b6afde64c2fb6f48ecd',
  name: 'teste',
  attribute: 'strength',
  nickName: 'teste_teste',
  weapons: 1,
  birthday: 0,
  attack: 18,
  hero: true,
  experance: 0,
};

@Controller('knight')
export class KnightsController {
  constructor(private readonly appService: KnightsService) {}

  @Post('')
  @ApiBody({ type: RequestKnightCreateDto })
  @ApiResponse({
    status: 201,
    description: 'Create a knight',
    example: {
      statusCode: 201,
      message: 'Knight created successfully',
      error: '',
      data: knightUnFormattedDefault,
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: RequestKnightCreateDto) {
    return await this.appService.create(body);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'Find all knights',
    example: {
      statusCode: 200,
      message: 'Knights found successfully',
      error: '',
      data: [knightFormattedDefault],
    },
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filter by heroes',
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('filter') filter: string) {
    return await this.appService.findAll(filter);
  }

  @Get('/:id')
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'knights id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Find knight by id',
    example: {
      statusCode: 200,
      message: 'Knights found successfully',
      error: '',
      data: knightFormattedDefault,
    },
  })
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return await this.appService.findById(id);
  }

  @Delete('/:id')
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'knights id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'delete knight by id',
    example: {
      statusCode: 200,
      message: 'Knight deleted successfully',
      error: '',
      data: {
        ...knightUnFormattedDefault,
        isHero: true,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.appService.delete(id);
  }

  @Patch('/:id')
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'knights id',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Update knight by id',
    example: {
      statusCode: 200,
      message: 'Knight updated successfully',
      error: '',
      data: knightUnFormattedDefault,
    },
  })
  @ApiBody({ type: RequestKnightUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() body: RequestKnightUpdateDto) {
    return await this.appService.update(id, body);
  }
}
