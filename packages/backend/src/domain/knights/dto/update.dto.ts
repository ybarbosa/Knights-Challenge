import { IsNotEmpty, IsString } from 'class-validator';

export class RequestKnightUpdateDto {
  @IsString()
  @IsNotEmpty()
  nickName: string;
}
