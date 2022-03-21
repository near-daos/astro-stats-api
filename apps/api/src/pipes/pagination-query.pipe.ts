import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PaginationQueryPipe implements PipeTransform {
  transform(query: any, metadata: ArgumentMetadata) {
    let { offset, limit } = query;

    if (!offset || offset < 0) {
      offset = 0;
    }

    if (!limit || limit < 0) {
      limit = 10;
    }

    return {
      offset,
      limit,
    };
  }
}
