import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  Redirect,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  @Redirect('https://google.com', 302)
  getCats() {
    // return { url: 'https://docs.nestjs.com/v5/' };
  }

  // @Get(':id')
  // @HttpCode(208)
  // getCat(@Param('id') id: number) {
  //   return id;
  // }

  @Get('docs')
  // @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    return version;
  }

  @Get('docs/url')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs12(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
