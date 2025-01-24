import { Injectable } from '@nestjs/common';

@Injectable()
export class KnightsService {
  getHello(): string {
    return 'Hello World!';
  }
}
