import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ObjectId } from 'mongodb';

export class ValidateObjectIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    if (!ObjectId.isValid(req.params.id)) {
      throw new BadRequestException('ObjectId invalid');
    }

    return handler.handle();
  }
}
