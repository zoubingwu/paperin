import { BadRequestException, NotFoundException } from '@nestjs/common';

export abstract class BaseService<T> {
  constructor() { }

  throwBadRequestException(msg: any): BadRequestException {
    throw new BadRequestException(msg);
  }

  throwNotFoundException(name: string): NotFoundException {
    throw new NotFoundException(`${name} not found`);
  }
}
