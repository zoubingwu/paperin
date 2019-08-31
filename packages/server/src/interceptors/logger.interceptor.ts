import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const logger = new Logger();

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const path = context.getArgByIndex(0).url;
    const method = context.getArgByIndex(0).method;

    return next
      .handle()
      .pipe(
        tap(() => logger.log(`[response] ${method} ${path} ${Date.now() - now}ms`)),
      );
  }
}
