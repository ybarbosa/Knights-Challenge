import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nickName: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty()
  birthday: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Weapons)
  @ApiProperty({
    example: [
      {
        id: '67953b46c0647da276604ffa',
        isEquipped: true,
      },
    ],
  })
  weapons: Weapons[];

  @IsEnum(AttributeName)
  @IsNotEmpty()
  @ApiProperty({
    enum: AttributeName,
    example: 'strength',
  })
  keyAttribute: AttributeName;
}
