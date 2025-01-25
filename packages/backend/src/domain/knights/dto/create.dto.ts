import { AttributeName } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class Weapons {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  isEquipped: boolean;
}
export class RequestKnightCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthday: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Weapons)
  weapons: Weapons[];

  @IsEnum(AttributeName)
  @IsNotEmpty()
  keyAttribute: AttributeName;
}
