import { AttributeName } from '@prisma/client';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class RequestKnightCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsNotEmpty()
  birthday: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  weapons: string[];

  @IsEnum(AttributeName)
  @IsNotEmpty()
  keyAttribute: AttributeName;
}
