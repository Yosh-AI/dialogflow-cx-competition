import {Injectable, NestMiddleware} from '@nestjs/common';
import {Response, NextFunction} from 'express';

@Injectable()
export class BQmiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
