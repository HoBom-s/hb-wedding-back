import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    var a = 1;
    return 'Hello World from Robin Yeon for PR github action test!';
  }
}
