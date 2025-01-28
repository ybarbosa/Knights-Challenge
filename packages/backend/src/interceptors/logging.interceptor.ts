import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP_REQUEST');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const logMessage = `METHOD - ${req.method} | URL - ${req.url} |  QUERY - ${JSON.stringify(req.query)} | PARAMS - ${JSON.stringify(req.params)} | BODY - ${JSON.stringify(req.body)} `;

    return next.handle().pipe(
      tap(() => {
        this.logger.log(logMessage);
      }),
      catchError((error) => {
        this.logger.log(logMessage);
        throw error;
      }),
    );
  }
}
