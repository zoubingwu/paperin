import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

const nestLogger = new Logger()

export function logger(req: Request, res: Response, next: NextFunction) {
  nestLogger.log(`[request]  ${req.method} ${req.url}`);
  next();
};
