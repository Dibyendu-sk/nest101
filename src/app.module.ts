import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { BasicController } from './basic/basic.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, BasicController],
  providers: [AppService],
})
export class AppModule {}
