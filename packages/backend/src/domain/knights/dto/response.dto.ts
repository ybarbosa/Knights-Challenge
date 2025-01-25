import { IsNumber, IsString } from 'class-validator';
export class ResponseStruct {
  @IsNumber()
  statusCode: number;
  @IsString()
  message?: string;
}
